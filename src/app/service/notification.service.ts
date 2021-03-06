import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  messageSuccess(msg) {
    this.config['panelClass'] = ['green-snackbar'];
    this.snackBar.open(msg, 'Close', this.config);
  }
  messageError(msg) {
    this.config['panelClass'] = ['red-snackbar'];
    this.snackBar.open(msg, 'Close', this.config);
  }

}
