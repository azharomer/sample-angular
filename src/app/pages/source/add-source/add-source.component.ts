import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { SourceService } from '../../../service/source.service';
import { NotificationService } from '../../../service/notification.service';

import {MAT_DIALOG_DATA, MatChipList, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
import {ILanguage} from '../../../model/data';
import {MatChipInputEvent} from '@angular/material';
import {DataSource, OptionEntry} from '../../common-component/search-select';
import {ServiceName} from '../../../service/service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.css']
})
export class AddSourceComponent implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;
  dataSource: DataSource;
  languages: ILanguage[] = [];
  edit = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [ 'Sports', ' Football'];
  reg = /^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i;

  constructor( protected router: Router,
               protected http: HttpClient,
               protected formBuilder: FormBuilder,
               protected dialogRef: MatDialogRef<AddSourceComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: SourceService,
               public notification: NotificationService,
               protected url: ServiceName,
  ) {
    this.initializeFormGroup();
    this.dataSource = {
      displayValue(value: any): Observable<OptionEntry | null> {
        if (typeof value === 'string') {
          value = parseInt(value, 10);
        }
        if (typeof value !== 'number') {
          return of(null);
        }
        // @ts-ignore
        return    http.get(`${url.language_data}/${value}`).pipe(
          map((e: any) =>
            ({
              value: e.data['id'],
              display: e.data['english_name'],
              details: {}
            })
          ));
      },
      search(term: string): Observable<OptionEntry[]> {
        // @ts-ignore
        return http.get(`${url.language_search}`, {
          params: {
            q: term || '',
            _sort: 'name'
          }
        })
          .pipe(map((list: any) =>  list.data.map(e => ({
            value: e['id'],
            display: e['english_name'],
            details: {}
          }))));
      }
    };
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    side: new FormControl('', [Validators.required]),
    official: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required,  Validators.pattern(this.reg)]),
    sitemap: new FormControl('', [Validators.required,  Validators.pattern(this.reg)]),
    country: new FormControl('', [Validators.required]),
    speciality: new FormControl('', [Validators.required]),
    language_id: new FormControl('', [Validators.required]),
    tags: new FormArray([], [Validators.required, this.validateArrayNotEmpty]),


  });

  private get itemsFormArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  addTags(event: MatChipInputEvent, form: FormGroup): void {
    const input = event.input;
    const value = event.value;

    // Add name
    if ((value || '').trim()) {
     this.itemsFormArray.push(new FormControl(value));
     // this.tags.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(form, index) {
    console.log(form);
    form.get('tags').removeAt(index);
    // this.tags.splice(index, 1);
  }

  initializeFormGroup() {

    if (this.data) {
      this.edit = true;
      this.tags = this.data.tags;
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        type: this.data.type,
        country: this.data.country,
        speciality: this.data.speciality,
        language_id: this.data.language.id,
        side: this.data.side,
        official: this.data.official,
        url: this.data.url,
        sitemap: this.data.sitemap,
        tags:  [],
      });
      this.form.setControl('tags', this.formBuilder.array(this.tags || []));

    }
  }

  ngOnInit() {
    this.form.get('tags').statusChanges.subscribe(status =>
      this.chipList.errorState = status === 'INVALID' ? true : false);

  }

  /**
   * fun for add / update data
   */
  add() {
    console.log(this.tags);
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.form.value.id) {
        this.service.updateSource(this.form.value)
          .then(res => {
            if (res) {
              if (res.status === 422) {
                const result = res.json();
                const validationErrors = result.errors;
                Object.keys(validationErrors).forEach(prop => {
                  const formControl = this.form.get(prop);
                  if (formControl) {
                    // activate the error message
                    formControl.setErrors({
                      serverError: validationErrors[prop]
                    });
                  }
                });
              } else if (!res.failed) {
                this.notification.messageSuccess('Update Source Success');
                this.close();
              } else {
                this.notification.messageError('Errors ');
                this.close();
              }
            }
          })
          .catch(err => {
            this.notification.messageError('Errors ');
          });
      } else {
        this.service.createSource(this.form.value)
          .then(res => {
            if (res) {
              console.log(res);
              if (res.status === 422) {
                const result = res.json();
                const validationErrors = result.errors;
                Object.keys(validationErrors).forEach(prop => {
                  const formControl = this.form.get(prop);
                  if (formControl) {
                    // activate the error message
                    formControl.setErrors({
                      serverError: validationErrors[prop]
                    });
                  }
                });
              } else if (!res.failed) {
                this.notification.messageSuccess('Create Source Success');
                this.close();
              } else {
                this.notification.messageError('Errors ');
                this.close();
              }
            }
          })
          .catch(err => console.log(err));
      }

    }
  }
  close() {
    this.form.reset();
  //  this.initializeFormGroup();
    this.dialogRef.close();
  }



}
