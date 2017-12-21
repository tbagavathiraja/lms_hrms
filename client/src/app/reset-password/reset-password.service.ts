import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import {AppConstants} from '../app.constant'

@Injectable()
export class ResetPasswordService {

  constructor(private http: Http) { }

  resetPassword(user){
    this.http.post(AppConstants.serverUrl + '/reset-password',user)
      .toPromise().
        then().
          catch();

  }


}
