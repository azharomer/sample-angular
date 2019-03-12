import { Component, OnInit, ViewChild} from '@angular/core';
import { AddSourceComponent } from '../add-source/add-source.component';
import { DialogService } from '../../../service/dialog.service';

import { SourceService } from '../../../service/source.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {ISourceDetails} from '../../../model/data';



@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  spinner = true;
  sources: ISourceDetails[] = [];
  pageLength: number;
  total: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'name', 'type', 'official', 'language', 'tags', 'action'];
  dataSource = new MatTableDataSource<ISourceDetails>();

  constructor(private dialog: MatDialog,
              private service: SourceService,
              public notification: NotificationService,
              private dialogService: DialogService,
              ) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
    await this.getSources(1, this.pageSize);
    this.pageLength = this.total;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddSourceComponent, dialogConfig).afterClosed().subscribe(res => {
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
    this.dialog.open(AddSourceComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  deleteSource(row) {
    // delete Service
    this.dialogService.openConfirmDialog(`Are You Sure you want to delete the source <strong class='color'>${row.name} </strong>,
         all the news URLs form it and their links with News entries (news entries will not be deleted)?`, 'Delete Source')
    .afterClosed().subscribe(res => {
      if (res) {
         this.service.deleteSource(row)
          .then(data => {
            this.refreshTable();
          })
          .catch(err => console.log(err));
      }
    });
  }

  async getSources(number, size) {
    this.sources = [];
    this.spinner = true;
    await this.service.loadSource(number, size).then((data) => {
      this.spinner = false;
      this.sources = this.dataSource.data.concat(data.data);
      this.dataSource.data = this.sources;
      this.total = data.total;
    });
  }

  async pageChangeEvent(event) {
    if (this.pageIndex === event.pageIndex && this.pageSize !== event.pageSize) {
      this.dataSource.data = [];
      await this.getSources(event.pageIndex + 1 , event.pageSize);
      this.pageSize = event.pageSize;
    } else {
      if (event.pageIndex > this.pageIndex) {
        await this.getSources(event.pageIndex + 1, event.pageSize);
        this.pageIndex = event.pageIndex ;
      }
    }
   this.pageLength = this.total;
  }

  async refreshTable() {
    this.dataSource.data = [];
    await this.getSources(1, this.pageSize);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}

