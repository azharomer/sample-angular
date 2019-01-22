import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject} from '@angular/core';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialgRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
   this.dialgRef.close();
  }
}
