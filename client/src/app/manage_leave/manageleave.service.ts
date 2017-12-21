import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class ManageLeaveService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private  localStorage:CoolLocalStorage) {}


  getleaves(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/getempleave',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  leave_type(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/leave_type',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  acceptleave(acceptParam: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .put(AppConstants.serverUrl + '/accept_leave', acceptParam,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  rejectleave(rejectParam: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
      return this.http
      .put(AppConstants.serverUrl + '/reject_leave', rejectParam,this.options)
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

