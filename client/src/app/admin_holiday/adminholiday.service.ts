import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import {CoolLocalStorage} from 'angular2-cool-storage'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class AdminHolidayService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http,private localStorage:CoolLocalStorage) {}

    getAllholiday(tenant:object): Promise<any> {
        let obj={
            params:tenant
        }
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        return this.http
        .get(AppConstants.serverUrl + '/getholiday',obj)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getHolidayDetails(holiday_id): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        return this.http
        .get(AppConstants.serverUrl + '/getHolidayDetails/'+holiday_id)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    insertHoliday(insertEmp:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        return this.http
        .post(AppConstants.serverUrl + '/holiday', insertEmp)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    updateHoliday(insertEmp:object,holiday_id): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        return this.http
        .put(AppConstants.serverUrl + '/holiday/'+holiday_id, insertEmp)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    delete_holiday(deleteParam:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        let obj={
            params:deleteParam
        }
        return this.http
        .delete(AppConstants.serverUrl + '/holiday', obj)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getlocation(): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        return this.http
        .get(AppConstants.serverUrl + '/getLocation')
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getdepartment(): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
        return this.http
        .get(AppConstants.serverUrl + '/getDepartment')
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

