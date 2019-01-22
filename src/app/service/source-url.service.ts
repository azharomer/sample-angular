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
  async loadSourceUrl(): Promise<any> {
    return await this.service.httpServiceGet(this.url.sourceUrl);
  }

  async findSourceUrl(id): Promise<any> {
    const  url = `${this.url.sourceUrl_find}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createSourceUrl(data): Promise<any> {
    return await this.service.httpServicePost(this.url.sourceUrl_create, data);
  }


  async updateSourceUrl(data): Promise<any> {
    const  url = `${this.url.sourceUrl_update}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteSourceUrl(id): Promise<any> {
    const url = `${this.url.sourceUrl_delete}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
