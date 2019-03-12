import { DialogService } from '../../../service/dialog.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';

import { UserService } from '../../../service/user.service';
import { NotificationService } from '../../../service/notification.service';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import {IUser} from '../../../model/data';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  users: IUser[] = [];
  spinner = true;
  pageLength: number;
  total: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource = new MatTableDataSource<IUser>();

  constructor(protected dialog: MatDialog,
              protected service: UserService,
              public notification: NotificationService,
              protected dialogService: DialogService,
  ) {

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
    await this.getUsers(1, this.pageSize);
    this.pageLength = this.total;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = row;
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  deleteUser(row) {
    // delete Service
    this.dialogService.openConfirmDialog(`Are You Sure you want to delete the User <strong class='color'>${row.name} </strong>,
        ?`, 'Delete User')
      .afterClosed().subscribe(res => {
        if (res) {
          this.service.deleteUser(row.id)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }
      });

  }

  async getUsers(number, size) {
    this.users = [];
    this.spinner = true;
    await this.service.loadUser(number, size).then((data) => {
      this.spinner = false;
      this.users = this.dataSource.data.concat(data.data);
      this.dataSource.data = this.users;
      this.total = data.total;
    });
  }

  async pageChangeEvent(event) {
    if (this.pageIndex === event.pageIndex && this.pageSize !== event.pageSize) {
      this.dataSource.data = [];
      await this.getUsers(event.pageIndex + 1 , event.pageSize);
      this.pageSize = event.pageSize;
    } else {
      if (event.pageIndex > this.pageIndex) {
        await this.getUsers(event.pageIndex + 1, event.pageSize);
        this.pageIndex = event.pageIndex ;
      }
    }
    this.pageLength = this.total;
  }
  async refreshTable() {
    this.dataSource.data = [];
    await this.getUsers(1, this.pageSize);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
