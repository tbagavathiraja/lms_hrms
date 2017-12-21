import { Injectable }              from '@angular/core';
import { Headers,Http, Response,RequestOptions }          from '@angular/http';
import { AppConstants } from '../app.constant';
import{CoolLocalStorage} from 'angular2-cool-storage'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class AssessmentService {

  protected headers = new Headers({'Content-Type': 'application/json'});

  protected options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http,private localStorage:CoolLocalStorage) {

  }

  getAssessment(data:any): Promise<any> {
    /*let options = new RequestOptions({ search: data });*/
    let obj={
      params:data
    }
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/get_assessment',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }
    getAssessmentPeriod(): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/get_assessment_period',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }
    delete_assessment(delete_param: object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/delete_assessment', delete_param, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
     getAssessmentList(getall:object): Promise<any> {
       this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:getall
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_assessment_list',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }
    getAssessmentEmployee(data:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    /*let options = new RequestOptions({ search: data });*/
    let obj={
      params:data
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_assessment_employee',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }

    saveAssessmentEmployee(data:object): Promise<any> {
      this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/add_assessment',data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }
  getEmployees(data): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     let obj={
      params:data
    }
    return this.http
      .get(AppConstants.serverUrl + '/get_employees',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }
  saveAssessment(data:any): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .put(AppConstants.serverUrl + '/save_assessment', data, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }

  submitAssessment(data:any): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .put(AppConstants.serverUrl + '/submit_assessment', data, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }

  getAllEmployees(data:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj={
      params:data
    }
    return this.http
      .get(AppConstants.serverUrl + '/assessment/get_employees',obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  resetManagers(data:object): Promise<any>{
  this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .post(AppConstants.serverUrl + '/assessment/reset_managers',data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }


  getReportingManagers(data:object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
     return this.http
      .post(AppConstants.serverUrl + '/assessment/get_reporting_managers',data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }

  saveReportingManagers(data:object): Promise<any> {
    return this.http
      .post(AppConstants.serverUrl + '/assessment/save_reporting_managers',data)
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

