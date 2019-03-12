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

  public context = SERVER_URL + '/context/?page=';
  public context_create = SERVER_URL + '/context/create';
  public context_find = SERVER_URL + '/context/{id}';
  public context_update = SERVER_URL + '/context/update';
  public context_delete = SERVER_URL + '/context/{id}';

  public entry = SERVER_URL + '/context/?page=';
  public entry_create = SERVER_URL + '/entry/create';
  public entry_find = SERVER_URL + '/entry/{id}';
  public entry_update = SERVER_URL + '/entry/update';
  public entry_delete = SERVER_URL + '/entry/{id}';

  public user = SERVER_URL + '/user/?page=';
  public user_create = SERVER_URL + '/user/';
  public user_data = SERVER_URL + '/user';
  // public user_update = SERVER_URL + '/user/{id}/';
  // public user_delete = SERVER_URL + '/user/{id}/';

  public source = SERVER_URL + '/source/?page=';
  public source_create = SERVER_URL + '/source/';
  public source_data = SERVER_URL + '/source';
  public source_search = SERVER_URL + '/source/search/';
  // public source_delete = SERVER_URL + '/source/{id}/';

  public sourceUrl = SERVER_URL + '/sourceurl/?page=';
  public sourceUrl_create = SERVER_URL + '/sourceurl/';
  public sourceUrl_data = SERVER_URL + '/sourceurl';
  // public sourceUrl_update = SERVER_URL + '/sourceurl/';
  // public sourceUrl_delete = SERVER_URL + '/sourceurl/';

  public language = SERVER_URL + '/language/?page=';
  public language_create = SERVER_URL + '/language/';
  public language_data = SERVER_URL + '/language';
  public language_search = SERVER_URL + '/language/search/';




}
