import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MatConfirmDialogComponent } from '../pages/common-component/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(protected dialog: MatDialog ) { }

  openConfirmDialog(msg, title) {
  return  this.dialog.open(MatConfirmDialogComponent, {
    width: '35%',
    panelClass: 'confirm-dialog-container',
    disableClose: true,
    data: {
      title: title,
      message: msg
    }
    });
  }
}
