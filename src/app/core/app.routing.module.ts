import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from '../pages/users/index-user/users.component';
import {LoginComponent } from '../pages/login/login.component';
import { ContextComponent } from '../pages/context/index-context/context.component';
import { SourceComponent } from '../pages/source/index-source/source.component';
import { EntriesComponent } from '../pages/entries/index-entry/entries.component';
import { SourceUrlComponent } from '../pages/source-url/index-url/source-url.component';
import { LanguageComponent } from '../pages/language/index-language/language.component';
import { AddEntryComponent } from '../pages/entries/add-entry/add-entry.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent, children: [
  { path: 'user', component: UsersComponent },
  { path: 'context', component: ContextComponent },
  { path: 'source', component: SourceComponent },
  { path: 'sorceUrl', component: SourceUrlComponent },
  { path: 'entry', component: EntriesComponent },
  { path: 'add-entry', component: AddEntryComponent },
  { path: 'language', component: LanguageComponent }

  ]},
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
