import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { AppConstants } from '../app.constant'
import { CoolLocalStorage } from 'angular2-cool-storage'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()

export class CalendarSettingsService {

  private headers = new Headers({'Content-Type': 'application/json'})
  private options = new RequestOptions({headers: this.headers})

  constructor (private http: Http, private localStorage: CoolLocalStorage) {}

  getAllbranch (): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    return this.http
      .get(AppConstants.serverUrl + '/get_calendar_branch')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  insertDaysGlobal (days: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))

    console.log(days)
    return this.http
      .post(AppConstants.serverUrl + '/calendar', days, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getBranch (branch: object): Promise<any> {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let obj = {
      params: branch
    }
    return this.http
      .get(AppConstants.serverUrl + '/calendarDetails', obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  private extractData (res: Response) {
    this.headers.set('auth_token', this.localStorage.getItem('auth_token'))
    let body = res.json()
    return body || {}
  }

  private handleError (error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}

