import { DialogService } from '../../../service/dialog.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ServiceName } from '../../../service/service';

import { EntryService } from '../../../service/entry.service';
import { NotificationService } from '../../../service/notification.service';
import { AddEntryComponent } from '../add-entry/add-entry.component';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface IEntry {
  title: string;
  id: number;
  time: string;
}

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
  displayedColumns: string[] = ['position', 'title', 'time', 'action'];
  dataSource = new MatTableDataSource<IEntry>();

  constructor(private dialog: MatDialog, private service: EntryService,
     public notification: NotificationService, private dialogService: DialogService) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getEntries();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddEntryComponent, dialogConfig);
  }

  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(AddEntryComponent, dialogConfig);
  }

  deleteEntry(row) {
    // delete Service
    this.dialogService.openConfirmDialog('Are You Sure To Delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteEntry(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  getEntries() {
    this.entries = [];
    this.service.loadEntry().then((data) => {
      this.entries = data.data;
      this.dataSource.data = this.entries;
    });
  }

}
