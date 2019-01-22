import { Component, OnInit, ViewChild} from '@angular/core';
import { AddLanguageComponent } from '../add-language/add-language.component';
import { DialogService } from '../../../service/dialog.service';

import { LanguageService } from '../../../service/language.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface ILanguage {
  id: number;
  name: string;
  englishName: string;
  isoCode: string;
  code_1: string;
  code_2: string;
  encoding: string;
}


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'englishName', 'isoCode', 'code_1', 'code_2', 'encoding', 'action'];
  languages: ILanguage[] = [];
  dataSource = new MatTableDataSource<ILanguage>();

  constructor(private dialog: MatDialog, private service: LanguageService,
     public notification: NotificationService, private dialogService: DialogService) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getLanguages();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddLanguageComponent, dialogConfig);
  }

  openEditDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row ;

    this.dialog.open(AddLanguageComponent, dialogConfig);
  }
  deleteLanguage(row) {
    // delete Service
    this.dialogService.openConfirmDialog('Are You Sure To Delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteLanguage(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  getLanguages() {
    this.languages = [];
    this.service.loadLanguage().then((data) => {
      this.languages = data.data;
      this.dataSource.data = this.languages;
    });
  }
}

