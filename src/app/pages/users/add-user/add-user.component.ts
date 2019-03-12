import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material';

import { NotificationService } from '../../../service/notification.service';
import { UserService } from '../../../service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  edit = false;

  constructor( protected router: Router,
               protected dialogRef: MatDialogRef<AddUserComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               protected service: UserService,
               public notification: NotificationService,
               ) {
    this.initializeFormGroup();
  }

  /**
   * Create Form validation
   */
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6)]),
  });

  /**
   * set values for form
   */
  initializeFormGroup() {
    if (this.data) {
      this.edit = true;
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        password: '',
      });
    } else {
      this.form.setValue({
        id: '',
        name: '',
        email: '',
        password: '',
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
        this.service.updateUser(this.form.value)
          .then(res => {
            this.notification.messageSuccess('Edit User Success');
            console.log(res);
            this.close();
          })
          .catch(err => console.log(err));
      } else {
        this.service.createUser(this.form.value)
          .then(res => {
            this.notification.messageSuccess('Create User Success');
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


}
