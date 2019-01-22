import { Component, OnInit, ViewChild} from '@angular/core';
import { AddSourceComponent } from '../add-source/add-source.component';
import { DialogService } from '../../../service/dialog.service';

import { SourceService } from '../../../service/source.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface ISource {
  id: number;
  name: string;
  type: string;
  country: string;
  speciality: string;
  language: string;
}

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sources: ISource[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'country', 'speciality', 'language', 'action'];
  dataSource = new MatTableDataSource<ISource>();

  constructor(private dialog: MatDialog,
              private service: SourceService,
              public notification: NotificationService,
              private dialogService: DialogService,
              ) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getSources();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddSourceComponent, dialogConfig);
  }
  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(AddSourceComponent, dialogConfig);
  }
  deleteSource(row) {
    // delete Service
    this.dialogService.openConfirmDialog('Are You Sure To Delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteSource(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  getSources() {
    this.sources = [];
    this.service.loadSource().then((data) => {
      this.sources = data.data;
      this.dataSource.data = this.sources;
    });
  }
}

