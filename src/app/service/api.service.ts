import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ServiceName } from '../service/service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  options: any;
  constructor(public http: Http, public serviceName: ServiceName) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    this.options = new RequestOptions({ headers: headers });
  }

  /** Post service call, to all database calls */
  async httpServicePost(service_name: string, requestData: Object = {}): Promise<any> {
    try {
      const res = await this.http.post(service_name, requestData, this.options).toPromise();
      return res.json();
      } catch (error) {
      return await error;
    }
  }

  /** PUT service call, to all database calls */
  async httpServicePut(service_name: string, requestData: Object = {}): Promise<any> {
    try {
      const res = await this.http.put(service_name, requestData, this.options).toPromise();
      return res.json();
      } catch (error) {
      return error;
    }
  }

  /** GET service call, to all database calls */
  async httpServiceGet(service_name: string): Promise<any> {
    try {
      const res = await this.http.get(service_name, this.options).toPromise();
      return res.json();
    } catch (error) {
      return await error;
    }
  }
  /** GET service call, to all database calls with search value */
  async httpServiceSearchGet(service_name: string, params: any): Promise<any> {
    try {
      const res = await this.http.get(service_name, params).toPromise();
      return res.json();
    } catch (error) {
      return await error;
    }
  }


  /** DELETE service call, to all database calls */
  async httpServiceDelete(service_name: string): Promise<any> {
    try {
      const res = await this.http.delete(service_name, this.options).toPromise();
      return res.json();
    } catch (error) {
      return await error;
    }
  }

  /** Error handler to all service calls */
  async  handleError(error) {
    return await (error.json() || 'Server error');
  }
}
