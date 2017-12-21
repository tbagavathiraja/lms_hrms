import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class LoginService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) {}

  getLoginType(tenant:object): Promise<any> {
    console.log("1",tenant)
     return this.http
      .post(AppConstants.serverUrl + '/login-type',tenant)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  authenticate(user: object): Promise<any> {
    return this.http
      .post(AppConstants.serverUrl + '/authenticate', user)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  googleAuthenticate(details: object): Promise<any> {
    return this.http
      .post(AppConstants.serverUrl + '/google_authenticate', details)
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

