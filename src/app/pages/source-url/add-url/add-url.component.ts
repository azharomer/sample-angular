import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { SourceUrlService } from '../../../service/source-url.service';

import { NotificationService } from '../../../service/notification.service';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatChipList, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ILanguage, ISource} from '../../../model/data';
import { OptionEntry, DataSource } from '../../common-component/search-select';
import { map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {ServiceName} from '../../../service/service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;
  edit = false ;
  languages: ILanguage[] = [];
  sources: ISource[] = [];
  dataSource: DataSource;
  dataLanguage: DataSource;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [ 'Sports', ' Football'];
  reg = /^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i;


  constructor( protected router: Router,
               protected http: HttpClient,
               protected dialogRef: MatDialogRef<AddUrlComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: SourceUrlService,
               public notification: NotificationService,
               protected url: ServiceName,
               protected formBuilder: FormBuilder,


  ) {
    this.initializeFormGroup();
    this.dataSource = {
      displayValue(value: any): Observable<OptionEntry | null> {
        console.log('finding display value for', value);
        if (typeof value === 'string') {
          value = parseInt(value, 10);
        }
        if (typeof value !== 'number') {
          return of(null);
        }
        console.log('finding display value =', value);
        // @ts-ignore
        return    http.get(`${url.source_data}/${value}`).pipe(
          map((e: any) =>
            ({
            value: e.data['id'],
            display: e.data['name'],
            details: {}
          })
          ));
      },
      search(term: string): Observable<OptionEntry[]> {
        // @ts-ignore
        return http.get(`${url.source_search}`, {
          params: {
            q: term || '',
            _sort: 'name'
          }
        })
          .pipe(map((list: any) =>  list.data.map(e => ({
          value: e['id'],
          display: e['name'],
          details: {}
        }))));
      }
    };
    this.dataLanguage = {
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
    title: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required,  Validators.pattern(this.reg)]),
    source_id: new FormControl('', [Validators.required]),
    language_id: new FormControl('', [Validators.required]),
    side: new FormControl('', [Validators.required]),
    official: new FormControl('', [Validators.required]),
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
        title: this.data.title,
        url: this.data.url,
        side: this.data.side,
        official: this.data.official,
        tags:  [],
        source_id: this.data.source.id,
        language_id: this.data.languages.id,
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
    if (this.form.valid) {
      if (this.form.value.id) {
        this.service.updateSourceUrl(this.form.value)
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
                this.notification.messageSuccess('Update Source URL Success');
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
        this.service.createSourceUrl(this.form.value)
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
                this.notification.messageSuccess('Creat Source URL Success');
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
        }
      }
  }

  close() {
    this.form.reset();
    // this.initializeFormGroup();
    this.dialogRef.close();
  }
}
