import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const SERVER_URL = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ServiceName {

  constructor() {
  }

  /* Service locations*/
  public login = SERVER_URL + '/auth/login';
  public register = SERVER_URL + '/register';
  public forgot_password = SERVER_URL + '/forgot-password';

  public context = SERVER_URL + '/context/';
  public context_create = SERVER_URL + '/context/create';
  public context_find = SERVER_URL + '/context/{id}';
  public context_update = SERVER_URL + '/context/update';
  public context_delete = SERVER_URL + '/context/{id}';

  public entry = SERVER_URL + '/context/';
  public entry_create = SERVER_URL + '/entry/create';
  public entry_find = SERVER_URL + '/entry/{id}';
  public entry_update = SERVER_URL + '/entry/update';
  public entry_delete = SERVER_URL + '/entry/{id}';

  public user = SERVER_URL + '/user/';
  public user_create = SERVER_URL + '/user/';
  public user_find = SERVER_URL + '/user/{id}';
  public user_update = SERVER_URL + '/user/{id}/';
  public user_delete = SERVER_URL + '/user/{id}/';

  public source = SERVER_URL + '/source/';
  public source_create = SERVER_URL + '/source/';
  public source_find = SERVER_URL + '/source/{id}';
  public source_update = SERVER_URL + '/source/{id}/';
  public source_delete = SERVER_URL + '/source/{id}/';

  public sourceUrl = SERVER_URL + '/sourceurl/';
  public sourceUrl_create = SERVER_URL + '/sourceurl/';
  public sourceUrl_find = SERVER_URL + '/sourceurl/{id}';
  public sourceUrl_update = SERVER_URL + '/sourceurl/{id}/';
  public sourceUrl_delete = SERVER_URL + '/sourceurl/{id}/';

  public language = SERVER_URL + '/language/';
  public language_create = SERVER_URL + '/language/';
  public language_find = SERVER_URL + '/language/{id}';
  public language_update = SERVER_URL + '/language/{id}/';
  public language_delete = SERVER_URL + '/language/{id}/';




}
