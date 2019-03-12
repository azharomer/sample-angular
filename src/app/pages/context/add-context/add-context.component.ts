import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';

import { ContextService } from '../../../service/context.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatChipList} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-context',
  templateUrl: './add-context.component.html',
  styleUrls: ['./add-context.component.css']
})
export class AddContextComponent implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;
  edit = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [ 'Sports', ' Football'];

  constructor(
               protected router: Router,
               protected formBuilder: FormBuilder,
               protected dialogRef: MatDialogRef<AddContextComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: ContextService,
               public notification: NotificationService,
  ) { this.initializeFormGroup(); }

  /**
   * Create Form validation
   */
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
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

  /**
   * set values for form
   */
  initializeFormGroup() {
    if (this.data) {
      this.edit = true;
      this.tags = this.data.tags;
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        type: this.data.type,
        tags: [],
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
      console.log(this.form.value);
      if (this.form.value.id) {
        this.service.updateContext(this.form.value)
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
                this.notification.messageSuccess('Update Context Success');
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
        this.service.createContext(this.form.value)
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
                this.notification.messageSuccess('Create Context Success');
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
  /**
   * fun for close dialog
   */
  close() {
    this.form.reset();
   // this.initializeFormGroup();
    this.dialogRef.close();
  }


}
