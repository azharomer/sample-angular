import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(protected service: ApiService, protected url: ServiceName) {}


  /**
   * load all Language from APIs
   */
  async loadLanguage(number, size): Promise<any> {
    const  url = `${this.url.language}${number}&pagesize=${size}`;
    return await this.service.httpServiceGet(url);
  }
  searchSource(value) {
    const url = `${this.url.language_search}`;
    return  this.service.httpServiceSearchGet(url, {params: {
        q: value || '',
        _sort: 'name'
      }});
  }
  async findLanguage(id): Promise<any> {
    const  url = `${this.url.language_data}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createLanguage(data): Promise<any> {
    return await this.service.httpServicePost(this.url.language_create, data);
  }


  async updateLanguage(data): Promise<any> {
    const  url = `${this.url.language_data}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteLanguage(id): Promise<any> {
    const url = `${this.url.language_data}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
