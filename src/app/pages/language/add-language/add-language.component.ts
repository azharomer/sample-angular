import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '../../../service/language.service';
import { NotificationService } from '../../../service/notification.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {

  constructor( protected router: Router,
               protected dialogRef: MatDialogRef<AddLanguageComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: LanguageService,
               public notification: NotificationService,
  ) {
    this.initializeFormGroup();
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    englishName: new FormControl('', [Validators.required]),
    isoCode: new FormControl('', [Validators.required]),
    code_1: new FormControl('', [Validators.required]),
    code_2: new FormControl('', [Validators.required]),
    encoding: new FormControl('', [Validators.required]),
  });

  initializeFormGroup() {
    if (this.data) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        englishName: this.data.englishName,
        isoCode: this.data.isoCode,
        code_1: this.data.code_1,
        code_2: this.data.code_2,
        encoding: this.data.encoding,
      });
    } else {
      this.form.setValue({
        id: '',
        name: '',
        englishName: '',
        isoCode: '',
        code_1: '',
        code_2: '',
        encoding: ''
      });
    }
  }
  ngOnInit() {
  }

  /**
   * fun for add / update data
   */
  add() {
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.form.value.id !== '') {
        this.service.updateLanguage(this.form.value).then(res => console.log(res))
          .catch(err => console.log(err));
      } else {
        this.service.createLanguage(this.form.value).then(res => console.log(res))
          .catch(err => console.log(err));
      }

    }
  }
  close() {
    this.form.reset();
    this.initializeFormGroup();
    this.notification.messageSuccess('Create Context Successfuly');
    this.dialogRef.close();
  }


}
