import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(protected service: ApiService, protected url: ServiceName) {}

  /**
   * load all Source from APIs
   */
  async loadSource(number, size): Promise<any> {
    console.log(number);
    const  url = `${this.url.source}${number}&pagesize=${size}`;
    return await this.service.httpServiceGet(url);
  }
   searchSource(value) {
    const url = `${this.url.source_search}`;
    return  this.service.httpServiceSearchGet(url, {params: {
        q: value || '',
        _sort: 'name'
      }});
  }

  async findSource(id): Promise<any> {
    const  url = `${this.url.source_data}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createSource(data): Promise<any> {
    return await this.service.httpServicePost(this.url.source_create, data);
  }


  async updateSource(data): Promise<any> {
    const  url = `${this.url.source_data}/${data.id}/`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteSource(data): Promise<any> {
    const url = `${this.url.source_data}/${data.id}`;
    return await this.service.httpServiceDelete(url);
  }
}
