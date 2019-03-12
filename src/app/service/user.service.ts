import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(protected service: ApiService, protected url: ServiceName) {}


  /**
   * load all Users from APIs
   */
  async loadUser(number, size): Promise<any> {
    const  url = `${this.url.user}${number}&pagesize=${size}`;
    return await this.service.httpServiceGet(url);
  }

  async findUser(id): Promise<any> {
    const  url = `${this.url.user_data}/${id}`;
    return await this.service.httpServiceGet(url);
  }

  async createUser(data): Promise<any> {
    return await this.service.httpServicePost(this.url.user_create, data);
  }


  async updateUser(data): Promise<any> {
    const  url = `${this.url.user_data}/${data.id}`;
    return await this.service.httpServicePut(url, data);
  }

  async deleteUser(id): Promise<any> {
    const url = `${this.url.user_data}/${id}`;
    return await this.service.httpServiceDelete(url);
  }
}
