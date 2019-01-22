import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
 constructor(protected service: ApiService, protected url: ServiceName) {}


  /**
   * load all Entry from APIs
   */
  async loadEntry(): Promise<any> {
    return await this.service.httpServiceGet(this.url.entry);
  }

  async findEntry(id): Promise<any> {
    const  url = `${this.url.entry_find}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createEntry(data): Promise<any> {
    return await this.service.httpServicePost(this.url.entry_create, data);
  }


  async updateEntry(data): Promise<any> {
    const  url = `${this.url.entry_update}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteEntry(id): Promise<any> {
    const url = `${this.url.entry_delete}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
