import { DialogService } from '../../../service/dialog.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';

import { UserService } from '../../../service/user.service';
import { NotificationService } from '../../../service/notification.service';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  users: IUser[] = [];
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

  ngOnInit() {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(AddUserComponent, dialogConfig);
  }
  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = row;
    this.dialog.open(AddUserComponent, dialogConfig);
  }
  deleteUser(row) {
    // delete Service
    this.dialogService.openConfirmDialog('Are You Sure To Delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.service.deleteUser(row.id)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }
      });

  }

  getUsers() {
    this.users = [];
    this.service.loadUser().then((data) => {
      this.users = data.data;
      this.dataSource.data = this.users;
    });
  }

}
