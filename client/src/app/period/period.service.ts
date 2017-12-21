import { Injectable } from '@angular/core';
import { Headers,Http, Response,RequestOptions} from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()
export class PeriodService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getPeriod(data:any): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    /*let options = new RequestOptions({ search: data });*/
    console.log("in getPeriod service")
    let obj={
      params:data
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_period',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addPeriod(data:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    /*let options = new RequestOptions({ search: data });*/
    return this.http
      .post(AppConstants.serverUrl + '/period/add',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updatePeriod(data:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    /*let options = new RequestOptions({ search: data });*/
    let obj={
      params:data
    }
    return this.http
      .post(AppConstants.serverUrl + '/period/save',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  delete_period(data:object): Promise<any> {

    /*let options = new RequestOptions({ search: data });*/

    let obj={
      params:data
    }
    return this.http
      .delete(AppConstants.serverUrl + '/period/delete/',this.options)
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
