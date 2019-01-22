import { Injectable } from '@angular/core';
import { ServiceName } from './service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(protected service: ApiService, protected url: ServiceName) {}

  async login(data): Promise<any> {
    return await this.service.httpServicePut(this.url.login, data);
  }


}
