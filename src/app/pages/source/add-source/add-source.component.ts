import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SourceService } from '../../../service/source.service';
import { LanguageService } from '../../../service/language.service';
import { NotificationService } from '../../../service/notification.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface ILanguage {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.css']
})
export class AddSourceComponent implements OnInit {

  languages: ILanguage[] = [];

  constructor( protected router: Router,
               protected dialogRef: MatDialogRef<AddSourceComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: SourceService,
               protected  languageService: LanguageService,
               public notification: NotificationService,
  ) {
    this.initializeFormGroup();
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    speciality: new FormControl('', [Validators.required]),
    language_id: new FormControl('', [Validators.required]),

  });

  initializeFormGroup() {

    if (this.data) {
     const language_id = this.languages.filter(
        language => language.name.trim().toLowerCase() === this.data.language.trim().toLowerCase());

      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        type: this.data.type,
        country: this.data.country,
        speciality: this.data.speciality,
        language_id: language_id[0].id,
      });
    } else {
      this.form.setValue({
        id: '',
        name: '',
        type: '',
        country: '',
        speciality: '',
        language_id: '',
      });
    }
  }

  ngOnInit() {
    this.getLanguages();
  }

  /**
   * fun for add / update data
   */
  add() {
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.form.value.id !== '') {
        this.service.updateSource(this.form.value).then(res => console.log(res))
          .catch(err => console.log(err));
      } else {
        this.service.createSource(this.form.value).then(res => console.log(res))
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

  getLanguages() {
    this.languages = [];
    this.languageService.loadLanguage().then((data) => {
      this.languages = data.data;
    });
  }


}
