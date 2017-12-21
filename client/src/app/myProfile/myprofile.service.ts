import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class MyProfileService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getSelfSummary(employee:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/get_self_summary',employee,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }

  getProfileSummary(tenant:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:tenant
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_myProfile',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }
    getDetail(employee_email:string): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/employee/' + employee_email, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    }

    updateEmployee(updateParam:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .put(AppConstants.serverUrl + '/updateMyprofile',updateParam,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    }


  getRoles(dataParam:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj = {params:dataParam}
    return this.http
      .get(AppConstants.serverUrl + '/roles',this.options)
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

