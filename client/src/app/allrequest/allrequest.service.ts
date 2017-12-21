import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import {CoolLocalStorage} from 'angular2-cool-storage'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class AllRequestService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getAllRequest(getAll): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
      let obj={
      params:getAll
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_all_request_summary',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getRequestInfo(request_id): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/get_request_details/'+request_id, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  approveRequest(request_id,updateParam): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .put(AppConstants.serverUrl + '/approve_request/'+request_id,updateParam, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getRequestSummary(request_id): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/get_request_summary/'+request_id, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  modifyRequest(request_id,updateParam): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .put(AppConstants.serverUrl + '/modify_request/'+request_id,updateParam, this.options)
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

