import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import {CoolLocalStorage} from 'angular2-cool-storage'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class CompoffRequestService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getAllCompoff(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/getcompoff',obj)
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
      .get(AppConstants.serverUrl + '/getCompoffDetails',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updatecompoff(editedLeave:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/updatecompoff', editedLeave)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }



  insertCompoff(insertCompoff:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    console.log(insertCompoff)
    return this.http
      .post(AppConstants.serverUrl + '/applycompoff', insertCompoff)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get_compoff_holidays(params:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:params
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_compoff_holidays',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  delete_compoff(deleteParam: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    console.log(deleteParam)
    return this.http
      .post(AppConstants.serverUrl + '/delete_compoff', deleteParam)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  totalCompoff(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/totalCompoff',obj)
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

