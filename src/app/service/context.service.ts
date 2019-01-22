import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(protected service: ApiService, protected url: ServiceName) {}


  /**
   * load all context from APIs
   */
  async loadContext(): Promise<any> {
    return await this.service.httpServiceGet(this.url.context);
  }

  async findContext(id): Promise<any> {
      const  url = `${this.url.context_find}/${id}`;
      return await this.service.httpServiceGet(url);
  }

  async createContext(data): Promise<any> {
    return await this.service.httpServicePost(this.url.context_create, data);
  }


  async updateContext(data): Promise<any> {
    const  url = `${this.url.context_update}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteContext(id): Promise<any> {
    const url = `${this.url.context_delete}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
