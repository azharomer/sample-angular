import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SourceUrlService } from '../../../service/source-url.service';
import { NotificationService } from '../../../service/notification.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {

  languages: any[] = [
    {'id': 1, 'name': 'ar'},
    {'id': 2, 'name': 'en'}
  ];
  sources: any[] = [
    {'id': 1, 'name': 'BBC'},
    {'id': 2, 'name': 'en'}
  ];


  constructor( protected router: Router,
               protected dialogRef: MatDialogRef<AddUrlComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: SourceUrlService,
               public notification: NotificationService,
  ) {
    this.initializeFormGroup();
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    url: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    source_id: new FormControl('', [Validators.required]),
    language_id: new FormControl('', [Validators.required]),

  });

  initializeFormGroup() {
    if (this.data) {
      const language_id = this.languages.filter(
        language => language.name.trim().toLowerCase() === this.data.language.trim().toLowerCase());
      const source_id = this.sources.filter(
        source => source.name.trim().toLowerCase() === this.data.source.trim().toLowerCase());


      this.form.setValue({
        id: this.data.id,
        type: this.data.type,
        url: this.data.url,
        source_id: source_id[0].id,
        language_id: language_id[0].id,
      });
    } else {
      this.form.setValue({
        id: '',
        url: '',
        type: '',
        source_id: '',
        language_id: ''
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
        this.service.createSourceUrl(this.form.value).then(res => console.log(res))
          .catch(err => console.log(err));
      } else {
        this.service.createSourceUrl(this.form.value).then(res => console.log(res))
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
