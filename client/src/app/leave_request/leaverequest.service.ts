import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class LeaveRequestService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  insertLeave(insertLeave:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .post(AppConstants.serverUrl + '/applyleave', insertLeave)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updateleave(editedLeave:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .post(AppConstants.serverUrl + '/updateleave', editedLeave)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAllleave(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
     return this.http
      .get(AppConstants.serverUrl + '/getleave',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get_leave_holiday(params:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:params
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_leave_holiday',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  delete_leave(deleteParam: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .post(AppConstants.serverUrl + '/delete_leave', deleteParam)
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
      .get(AppConstants.serverUrl + '/getEditDetails',this.options)
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

