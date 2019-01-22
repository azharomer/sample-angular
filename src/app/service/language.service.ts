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
  async loadLanguage(): Promise<any> {
    return await this.service.httpServiceGet(this.url.language);
  }

  async findLanguage(id): Promise<any> {
    const  url = `${this.url.language_find}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createLanguage(data): Promise<any> {
    return await this.service.httpServicePost(this.url.language_create, data);
  }


  async updateLanguage(data): Promise<any> {
    const  url = `${this.url.language_update}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteLanguage(id): Promise<any> {
    const url = `${this.url.language_delete}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
