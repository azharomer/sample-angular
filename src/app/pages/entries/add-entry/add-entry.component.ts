import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { EntryService } from '../../../service/entry.service';
import { NotificationService } from '../../../service/notification.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IContext} from '../../../model/data';
import {ContextService} from '../../../service/context.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

  edit = false;
  contexts: IContext[] = [];


  constructor(protected router: Router,
              protected dialogRef: MatDialogRef<AddEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              protected contextService: ContextService,
              protected service: EntryService,
              public notification: NotificationService,
  ) {
    this.initializeFormGroup();
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    context: new FormControl('', [Validators.required]),

  });

  initializeFormGroup() {
    if (this.data) {
      this.edit = true;
      this.form.setValue({
        id: this.data.id,
        title: this.data.title,
        time: this.data.time,
        context: '',
      });
    } else {
      this.form.setValue({
        id: '',
        title: '',
        time: '',
        date: '',
        context: '',
      });
    }

  }

  ngOnInit() {
    this.getContexts();
  }

  /**
   * fun for add / update data
   */
  add() {
    if (this.form.valid) {
      // console.log(this.form.value);
      if (this.form.value.id !== '') {
        this.service.updateEntry(this.form.value)
          .then(res => {
            this.notification.messageSuccess('Edit Entry Success');
            console.log(res);
            this.close();
          })
          .catch(err => console.log(err));
      } else {
        this.service.createEntry(this.form.value)
          .then(res => {
            this.notification.messageSuccess('Create Entry Success');
            console.log(res);
            this.close();
          })
          .catch(err => console.log(err));
      }

    }
  }

  close() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  getContexts() {
    this.contexts = [];
    this.contextService.loadContext(1, 50).then((data) => {
      this.contexts = data.data;
    });
  }

}
