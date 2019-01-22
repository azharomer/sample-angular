// import { environment } from '../../../../environments/environment';
import { DialogService } from '../../../service/dialog.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { AddContextComponent } from '../add-context/add-context.component';

import { ContextService } from '../../../service/context.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface IContext {
  name: string;
  id: number;
  type: string;
}

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  contexts: IContext[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'action'];
  dataSource = new MatTableDataSource<IContext>();
  // protected environmentSettings = environment;

  constructor(private dialog: MatDialog,
              private service: ContextService,
              public notification: NotificationService,
              private dialogService: DialogService,
              ) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getContexts();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddContextComponent, dialogConfig);
  }
  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(AddContextComponent, dialogConfig);
  }
  deleteContext(row) {
    // delete Service
    this.dialogService.openConfirmDialog('Are You Sure To Delete this recorde?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteContext(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  getContexts() {
    this.contexts = [];
    this.service.loadContext().then((data) => {
      this.contexts = data.data;
      this.dataSource.data = this.contexts;
    });
  }
}
