import { Component, OnInit, ViewChild} from '@angular/core';
import { AddUrlComponent } from '../add-url/add-url.component';
import { DialogService } from '../../../service/dialog.service';

import { SourceUrlService } from '../../../service/source-url.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {ISourceUrl} from '../../../model/data';




@Component({
  selector: 'app-source-url',
  templateUrl: './source-url.component.html',
  styleUrls: ['./source-url.component.css']
})
export class SourceUrlComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sourceUrl: ISourceUrl[] = [];
  spinner = true;
  pageLength: number;
  total: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'title', 'url', 'source', 'language', 'tags', 'action'];
  dataSource = new MatTableDataSource<ISourceUrl>();

  constructor(private dialog: MatDialog,
              private service: SourceUrlService,
              public notification: NotificationService,
              private dialogService: DialogService,
              ) { }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
      await this.getSourceUrl(1, this.pageSize);
      this.pageLength = this.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddUrlComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row ;
    this.dialog.open(AddUrlComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  deleteSourceUrl(row) {
    // delete Service
    this.dialogService.openConfirmDialog(`Are You Sure you want to delete the source URL <strong class='color'>${row.title} </strong>,
         all the news URLs form it and their links with News entries (news entries will not be deleted)?`, 'Delete Source URL')
      .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteSourceUrl(row.id)
          .then(data => {
            this.refreshTable();
          } )
          .catch(err => console.log(err));
      }
    });

  }


  async getSourceUrl(number, size) {
    this.sourceUrl = [];
    this.spinner = true;
    await this.service.loadSourceUrl(number, size).then((data) => {
      this.spinner = false;
      this.sourceUrl = this.dataSource.data.concat(data.data);
      this.dataSource.data = this.sourceUrl;
      this.total = data.total;
    });
  }

  async pageChangeEvent(event) {
    if (this.pageIndex === event.pageIndex && this.pageSize !== event.pageSize) {
      this.dataSource.data = [];
      await this.getSourceUrl(event.pageIndex + 1, event.pageSize);
      this.pageSize = event.pageSize;
    } else {
      if (event.pageIndex > this.pageIndex) {
        await this.getSourceUrl(event.pageIndex + 1, event.pageSize);
        this.pageIndex = event.pageIndex ;
      }
    }
    this.pageLength = this.total;
  }
  async refreshTable() {
    this.dataSource.data = [];
    await this.getSourceUrl(1, this.pageSize);
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}

