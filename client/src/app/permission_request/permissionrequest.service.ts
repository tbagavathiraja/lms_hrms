import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class PermissionRequestService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getAllPermission(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/getpermission',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get_edit_details(saveEmployee:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:saveEmployee
    }
    return this.http
      .get(AppConstants.serverUrl + '/getPermissionDetails',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  updatepermission(editedLeave:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/updatepermission', editedLeave,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  totalpermission(tenant:object): Promise<any> {
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/totalpermission',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  insertPermission(insertPermission:object): Promise<any> {
    return this.http
      .post(AppConstants.serverUrl + '/applyPermission', insertPermission,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get_permission_holidays(params:object): Promise<any> {
    let obj={
      params:params
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_permission_holidays',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  delete_permission(deleteParam: object): Promise<any> {
    return this.http
      .post(AppConstants.serverUrl + '/delete_permission', deleteParam,this.options)
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

