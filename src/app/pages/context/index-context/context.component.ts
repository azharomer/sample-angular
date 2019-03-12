// import { environment } from '../../../../environments/environment';
import { DialogService } from '../../../service/dialog.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { AddContextComponent } from '../add-context/add-context.component';

import { ContextService } from '../../../service/context.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {IContext} from '../../../model/data';



@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  contexts: IContext[] = [];
  spinner = true;
  pageLength: number;
  total: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'name', 'type', 'tags', 'action'];
  dataSource = new MatTableDataSource<IContext>();

  constructor(protected dialog: MatDialog,
              protected service: ContextService,
              public notification: NotificationService,
              protected dialogService: DialogService,
              ) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
      await this.getContexts(1, this.pageSize);
      this.pageLength = this.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddContextComponent, dialogConfig).afterClosed().subscribe(res => {
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
    this.dialog.open(AddContextComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  deleteContext(row) {
    // delete Service
    this.dialogService.openConfirmDialog(`Are You Sure you want to delete the Context <strong class='color'>${row.name} </strong>,
         all the links with News entries (news entries will not be deleted)?`, 'Delete Context')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteContext(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  async getContexts(number, size) {
    this.contexts = [];
    this.spinner = true;
    // await this.service.loadContext(number, size).then((data) => {
    //   this.spinner = false;
    //   this.contexts = this.dataSource.data.concat(data.data);
    //   this.dataSource.data = this.contexts;
    //   this.total = data.total;
    // }).catch(err => {
      this.spinner = false;
      this.dataSource.data = [];
    // });
  }

  async pageChangeEvent(event) {
    if (this.pageIndex === event.pageIndex && this.pageSize !== event.pageSize) {
      this.dataSource.data = [];
      await this.getContexts(event.pageIndex + 1 , event.pageSize);
      this.pageSize = event.pageSize;
    } else {
      if (event.pageIndex > this.pageIndex) {
        await this.getContexts(event.pageIndex + 1, event.pageSize);
        this.pageIndex = event.pageIndex ;
      }
    }
    this.pageLength = this.total;
  }
  async refreshTable() {
    this.dataSource.data = [];
    await this.getContexts(1, this.pageSize);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
