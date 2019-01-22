import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { ContextService } from '../../../service/context.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-add-context',
  templateUrl: './add-context.component.html',
  styleUrls: ['./add-context.component.css']
})
export class AddContextComponent implements OnInit {

  constructor(
               protected router: Router,
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
  });

  /**
   * set values for form
   */
  initializeFormGroup() {
    if (this.data) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        type: this.data.type,
      });
    } else {
      this.form.setValue({
        id: '',
        name: '',
        type: '',
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
        this.service.updateContext(this.form.value).then(res => console.log(res))
          .catch(err => console.log(err));
      } else {
        this.service.createContext(this.form.value).then(res => console.log(res))
          .catch(err => console.log(err));
      }

    }
  }

  /**
   * fun for close dialog
   */
  close() {
    this.form.reset();
    this.initializeFormGroup();
    this.notification.messageSuccess('Create Context Successfuly');
    this.dialogRef.close();
  }


}
