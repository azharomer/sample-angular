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
  async loadSource(): Promise<any> {
    return await this.service.httpServiceGet(this.url.source);
  }

  async findSource(id): Promise<any> {
    const  url = `${this.url.source_find}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createSource(data): Promise<any> {
    return await this.service.httpServicePost(this.url.source_create, data);
  }


  async updateSource(data): Promise<any> {
    const  url = `${this.url.source_update}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteSource(id): Promise<any> {
    const url = `${this.url.source_delete}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
