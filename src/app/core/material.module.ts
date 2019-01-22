import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatListModule,
  MatExpansionModule, MatSidenavModule, MatPaginatorModule, MatSortModule, MatGridListModule,
  MatSnackBarModule, MatOptionModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
  CommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule

  ],
  exports: [
  CommonModule,
   MatToolbarModule,
   MatButtonModule,
   MatCardModule,
   MatInputModule,
   MatDialogModule,
   MatTableModule,
   MatMenuModule,
   MatIconModule,
   MatListModule,
   MatExpansionModule,
   MatSidenavModule,
   MatProgressSpinnerModule,
   MatPaginatorModule,
   MatSortModule,
   MatGridListModule,
   MatSnackBarModule,
   MatOptionModule,
   MatSelectModule

   ],
})
export class MaterialModule {}
