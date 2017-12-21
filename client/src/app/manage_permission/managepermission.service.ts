import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CoolLocalStorage} from 'angular2-cool-storage'
import 'rxjs/add/operator/toPromise';
@Injectable()

export class ManagePermissionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}


  getpermission(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/getempermission',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  acceptpermission(acceptParam: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    console.log(acceptParam)
    return this.http
      .put(AppConstants.serverUrl + '/accept_permission', acceptParam,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  rejectpermission(rejectParam: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    console.log(rejectParam)
    return this.http
      .put(AppConstants.serverUrl + '/reject_permission', rejectParam,this.options)
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

