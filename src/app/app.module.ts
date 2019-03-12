// import { ContextsModule } from './pages/context/contexts.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './core/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './core/app.routing.module';

import { LayoutModule } from '@angular/cdk/layout';
import { ApiService } from './service/api.service';
import { ServiceName } from './service/service';

import { EntryService } from './service/entry.service';
import { ContextService } from './service/context.service';
import { LanguageService } from './service/language.service';

import { SourceService } from './service/source.service';
import { SourceUrlService } from './service/source-url.service';
import { NotificationService } from './service/notification.service';

import { TokenService} from './service/token.service';
import { AuthGuard} from './service/auth-guard .service';
import { LoginComponent } from './pages/login/login.component';

import { UsersComponent } from './pages/users/index-user/users.component';
import { ContextComponent } from './pages/context/index-context/context.component';
import { SourceComponent } from './pages/source/index-source/source.component';

import { EntriesComponent } from './pages/entries/index-entry/entries.component';
import { SourceUrlComponent } from './pages/source-url/index-url/source-url.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LanguageComponent } from './pages/language/index-language/language.component';

import { AddContextComponent } from './pages/context/add-context/add-context.component';
import { AddEntryComponent } from './pages/entries/add-entry/add-entry.component';

import { AddLanguageComponent } from './pages/language/add-language/add-language.component';
import { AddSourceComponent } from './pages/source/add-source/add-source.component';

import { AddUrlComponent } from './pages/source-url/add-url/add-url.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatConfirmDialogComponent } from './pages/common-component/confirm-dialog/confirm-dialog.component';
import { SearchSelectModule } from './pages/common-component/search-select';

import { from } from 'rxjs';
import { ViewEntryComponent } from './pages/entries/view-entry/view-entry.component';
import { ViewContextComponent } from './pages/context/view-context/view-context.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ContextComponent,
    SourceComponent,
    EntriesComponent,
    SourceUrlComponent,
    DashboardComponent,
    LanguageComponent,
    AddContextComponent,
    AddEntryComponent,
    AddLanguageComponent,
    AddSourceComponent,
    AddUrlComponent,
    AddUserComponent,
    MatConfirmDialogComponent,
    ViewEntryComponent,
    ViewContextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    SearchSelectModule,
    NgxMaterialTimepickerModule.forRoot(),
    LayoutModule,
    // ContextsModule,
  ],
  providers: [
    ApiService,
    ServiceName,
    EntryService,
    NotificationService,
    ContextService,
    LanguageService,
    SourceService,
    SourceUrlService,
    TokenService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddEntryComponent,
    MatConfirmDialogComponent,
    AddContextComponent,
    AddLanguageComponent,
    AddUserComponent,
    AddSourceComponent,
    AddUrlComponent
  ]
})
export class AppModule { }
