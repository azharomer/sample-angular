import { Component, OnInit, ViewChild} from '@angular/core';
import { AddUrlComponent } from '../add-url/add-url.component';
import { DialogService } from '../../../service/dialog.service';

import { SourceUrlService } from '../../../service/source-url.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface ISourceUrl {
  id: number;
  url: string;
  type: string;
  source: string;
  language: string;
}


@Component({
  selector: 'app-source-url',
  templateUrl: './source-url.component.html',
  styleUrls: ['./source-url.component.css']
})
export class SourceUrlComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sourceUrl: ISourceUrl[] = [];
  displayedColumns: string[] = ['id', 'url', 'type', 'source', 'language', 'action'];
  dataSource = new MatTableDataSource<ISourceUrl>();

  constructor(private dialog: MatDialog,
              private service: SourceUrlService,
              public notification: NotificationService,
              private dialogService: DialogService,
              ) { }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getSourceUrl();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddUrlComponent, dialogConfig);
  }
  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row ;
    this.dialog.open(AddUrlComponent, dialogConfig);
  }
  deleteSourceUrl(row) {
    // delete Service
    this.dialogService.openConfirmDialog('Are You Sure To Delete this record?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteSourceUrl(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });

  }

  getSourceUrl() {
    this.sourceUrl = [];
    this.service.loadSourceUrl().then((data) => {
      this.sourceUrl = data.data;
      this.dataSource.data = this.sourceUrl;
    });
  }

}

