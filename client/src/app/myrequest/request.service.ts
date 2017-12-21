import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { AppConstants } from '../app.constant'
import { CoolLocalStorage } from 'angular2-cool-storage'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()

export class RequestService {

  private headers = new Headers({'Content-Type': 'application/json'})
  private options = new RequestOptions({headers: this.headers})

  constructor (private http: Http, private localStorage: CoolLocalStorage) {
  }

  getRequestSummary (user: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .post(AppConstants.serverUrl + '/get_request_summary', user, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getProjectList (user: object): Promise<any> {

    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .post(AppConstants.serverUrl + '/get_project_summary', user, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getEmployeeList (user: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .post(AppConstants.serverUrl + '/get_employee_list', user, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  insertRequest (data): Promise<any> {

    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .post(AppConstants.serverUrl + '/insert_request', data, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  updateRequest (resource_request_id, data): Promise<any> {

    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .put(AppConstants.serverUrl + '/update_request/' + resource_request_id, data, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getRequestInfo (request_id): Promise<any> {

    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    return this.http
      .get(AppConstants.serverUrl + '/get_request_summary/' + request_id, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  deleteRequest (data): Promise<any> {

    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    let obj = {
      params: data
    }
    return this.http
      .delete(AppConstants.serverUrl + '/request/delete',this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  private extractData (res: Response) {
    let body = res.json()
    return body || {}
  }

  private handleError (error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}

