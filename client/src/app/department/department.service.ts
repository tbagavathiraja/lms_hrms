import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class DepartmentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  insertDepartment(insertDepartment:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/department', insertDepartment)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updateDepartment(department_id,editedDepartment:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .put(AppConstants.serverUrl + '/department/'+department_id, editedDepartment)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getDepartment(data:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:data
    }
    console.log(obj);
    return this.http
      .get(AppConstants.serverUrl + '/getDepartment',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteDepartment(department_id): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .delete(AppConstants.serverUrl + '/deleteDepartment/'+department_id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getDepartmentDetails(department_id): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/getDepartmentDetails/'+department_id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

