import { Component, OnInit, ViewChild} from '@angular/core';
import { AddLanguageComponent } from '../add-language/add-language.component';
import { DialogService } from '../../../service/dialog.service';

import { LanguageService } from '../../../service/language.service';
import { NotificationService } from '../../../service/notification.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {ILanguageDetails} from '../../../model/data';




@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'englishName', 'isoCode', 'code_2', 'code_3', 'encoding', 'action'];
  languages: ILanguageDetails[] = [];
  spinner = true;
  pageLength: number;
  total: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  dataSource = new MatTableDataSource<ILanguageDetails>();

  constructor(private dialog: MatDialog, private service: LanguageService,
     public notification: NotificationService, private dialogService: DialogService) { }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
      await this.getLanguages(1, this.pageSize);
      this.pageLength = this.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddLanguageComponent, dialogConfig).afterClosed().subscribe(res => {
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

    this.dialog.open(AddLanguageComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.refreshTable();
      }
    });
  }
  deleteLanguage(row) {
    // delete Service
    this.dialogService.openConfirmDialog(`Are You Sure you want to delete the Language <strong class='color'>${row.english_name} </strong>
    ?`, 'Delete Language')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteLanguage(row.id)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    });
  }

  async getLanguages(number, size) {
    this.languages = [];
    this.spinner = true;
    await this.service.loadLanguage(number, size).then((data) => {
      this.spinner = false;
      this.languages = this.dataSource.data.concat(data.data);
      this.dataSource.data = this.languages;
      this.total = data.total;
    });
  }

  async pageChangeEvent(event) {
    if (this.pageIndex === event.pageIndex && this.pageSize !== event.pageSize) {
      this.dataSource.data = [];
      await this.getLanguages(event.pageIndex + 1 , event.pageSize);
      this.pageSize = event.pageSize;
    } else {
      if (event.pageIndex > this.pageIndex) {
        await this.getLanguages(event.pageIndex + 1, event.pageSize);
        this.pageIndex = event.pageIndex ;
      }
    }
    this.pageLength = this.total;
  }
  async refreshTable() {
    this.dataSource.data = [];
    await this.getLanguages(1, this.pageSize);
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}

