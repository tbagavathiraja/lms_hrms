import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class SettingsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  getAll(): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/settings')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get_edit_settings(saveSettings:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:saveSettings
    }
    return this.http
      .get(AppConstants.serverUrl + '/getEditSettings',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  edit_settings(saveSettings:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    console.log(saveSettings);
    return this.http
      .put(AppConstants.serverUrl + '/editSettings', saveSettings)
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

