import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import {CoolLocalStorage} from 'angular2-cool-storage'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class AssessmentParameterService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getAll(getAll:Object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
      let params = {params:getAll};
    return this.http
      .get(AppConstants.serverUrl + '/get_assessment_parameter',params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
    getDetail(parameter_id:number): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/get_assessment_parameter/' + String(parameter_id), this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    }
    updateParameter(parameter_id:number,updateParam:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .put(AppConstants.serverUrl + '/assessment_parameter/' + String(parameter_id), updateParam, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    }

    insertParameter(insertParam:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/assessment_parameter', insertParam, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    }
      delete_parameter(delete_param: object): Promise<any> {
        this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/delete_parameter', delete_param, this.options)
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

