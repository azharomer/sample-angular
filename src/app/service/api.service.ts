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
    // @TODO: @Azhar #Important all AJAX calls should be JSON application/json encoded
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: headers });
  }

  /** Post service call, to all database calls */
  httpServicePost(service_name: string, requestData: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(service_name, requestData, this.options)
        .subscribe(
          response => resolve(response.json()),
          error => reject(error.json())
        );
    });
  }

  /** PUT service call, to all database calls */
  httpServicePut(service_name: string, requestData: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put(service_name, requestData, this.options)
        .subscribe(
          response => resolve(response.json()),
          error => reject(error.json())
        );
    });
  }

  /** GET service call, to all database calls */
  httpServiceGet(service_name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(service_name)
        .subscribe(
          response => resolve(response.json()),
          error => reject(error.json())
        );
    });
  }

  /** DELETE service call, to all database calls */
  httpServiceDelete(service_name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(service_name, this.options)
        .subscribe(
          response => resolve(response.json()),
          error => reject(error.json())
        );
    });
  }

  /** Error handler to all service calls */
  private handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
