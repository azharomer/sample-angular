import { DialogService } from '../../../service/dialog.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ServiceName } from '../../../service/service';

import { EntryService } from '../../../service/entry.service';
import { NotificationService } from '../../../service/notification.service';
import { AddEntryComponent } from '../add-entry/add-entry.component';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {IEntry} from '../../../model/data';


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  providers: [ApiService, ServiceName]

})
export class EntriesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  entries: IEntry[] = [];
  pageLength: number;
  total: number;
  spinner = true;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['position', 'title', 'time', 'action'];
  dataSource = new MatTableDataSource<IEntry>();

  constructor(private dialog: MatDialog, private service: EntryService,
     public notification: NotificationService, private dialogService: DialogService) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
      await this.getEntries(1, this.pageSize);
      this.pageLength = this.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddEntryComponent, dialogConfig).afterClosed().subscribe(res => {
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
    dialogConfig.data = row;
    this.dialog.open(AddEntryComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }

  deleteEntry(row) {
    // delete Service
    this.dialogService.openConfirmDialog(`Are You Sure you want to delete the Entry <strong class='color'>${row.title} </strong>,
         all the news URLs form it and their links with News Context (news Context will not be deleted)?`, 'Delete Entry')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteEntry(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  async getEntries(number, size) {
    this.entries = [];
    this.spinner = true;
    await this.service.loadEntry(number, size).then((data) => {
      this.spinner = false;
      this.entries = this.dataSource.data.concat(data.data);
      this.dataSource.data = this.entries;
      this.total = data.total;
    });
  }

  async pageChangeEvent(event) {
    if (this.pageIndex === event.pageIndex && this.pageSize !== event.pageSize) {
      this.dataSource.data = [];
      await this.getEntries(event.pageIndex + 1 , event.pageSize);
      this.pageSize = event.pageSize;
    } else {
      if (event.pageIndex > this.pageIndex) {
        await this.getEntries(event.pageIndex + 1, event.pageSize);
        this.pageIndex = event.pageIndex ;
      }
    }
    this.pageLength = this.total;
  }
  async refreshTable() {
    this.dataSource.data = [];
    await this.getEntries(1, this.pageSize);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
