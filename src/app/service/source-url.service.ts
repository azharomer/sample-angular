import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SourceUrlService {

  constructor(protected service: ApiService, protected url: ServiceName) {}


  /**
   * load all SourceUrl from APIs
   */
  async loadSourceUrl(number, size): Promise<any> {
    const  url = `${this.url.sourceUrl}${number}&pagesize=${size}`;
    return await this.service.httpServiceGet(url);
  }

  async findSourceUrl(id): Promise<any> {
    const  url = `${this.url.sourceUrl_data}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createSourceUrl(data): Promise<any> {
    return await this.service.httpServicePost(this.url.sourceUrl_create, data);
  }


  async updateSourceUrl(data): Promise<any> {
    const  url = `${this.url.sourceUrl_data}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteSourceUrl(id): Promise<any> {
    const url = `${this.url.sourceUrl_data}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
