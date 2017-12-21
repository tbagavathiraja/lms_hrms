import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()

export class LocationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private localStorage:CoolLocalStorage) {}

  insertLocation(insertLocation:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/location', insertLocation,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updateLocation(location_id,editedLocation:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .put(AppConstants.serverUrl + '/updateLocation/'+location_id, editedLocation,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAllLocatoin(data:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        let obj={
            params:data
        }
    return this.http
      .get(AppConstants.serverUrl + '/getLocation',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteLocation(location_id): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .delete(AppConstants.serverUrl + '/deleteLocation/'+location_id,this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getLocationDetails(location_id): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/getLocationDetails/'+location_id,this.options)
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

