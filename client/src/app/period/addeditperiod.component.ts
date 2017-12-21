import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppConstants, ErrorConstants} from "../app.constant";
import {PeriodService} from "../period/period.service";
//import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';

@Component({
  selector: 'app-addperiod',
  templateUrl: './addeditperiod.component.html',
  styleUrls: ['./period.component.css']
})
export class AddEditPeriodComponent implements OnInit {

  private errorMsg;
  private successMsg;
  private storedDetail;
  private periodResults = [];
  private error = {};
  private period_data = {
    start_date : "",
    end_date : "",
    submission_start_date : "",
    submission_end_date: "",
    resubmission_end_date: "",
  };
  heading ='Add Period';


  constructor(
  private router :Router,
  private appComponent:AppComponent,
  private activatedRoute: ActivatedRoute,
  public localStorage: CoolLocalStorage,
  private periodService:PeriodService,
  /*private myDatePickerOptions: IDatePickerpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  }*/
) {
    this.appComponent.showIncludes=true;
  }

  ngOnInit() {
    this.errorMsg = "";
    this.successMsg="";
    this.storedDetail=this.localStorage.getObject('storedDetails');
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }


  /*addPeriod(id) {
   this.delete_id = id;
   this.modal.confirm()
   .showClose(true)
   .okBtn('Delete')
   .cancelBtn('Cancel')
   .title('Delete Confirmation')
   .body('Are you sure want to delete assessment parameter?')
   .open()
   .catch(err => alert("ERROR")) // catch error not related to the result (modal open...)
   .then((dialog : any ) => dialog.result)
   .then(result => this.delete_confirm()) // if were here ok was clicked.
   .catch() // if were here it was cancelled (click or non block click);
   }*/
  getPeriodData(period_id){
    let localSessionData = this.storedDetail;
    let params={
      'tenant_id':localSessionData.tenant_id,
      period_id,
    }
    this.periodService.getPeriod(params)
      .then(
        (response) => {
          if (response.status === AppConstants.successStatus) {
            this.periodResults=response.data;
          }
          else {
            this.errorMsg=response.message;
          }
        }).catch((error) => {

      if (error.json().code == null) {
        this.error = {
          message: error.statusText,
          status: error.status
        };
      } else {
        this.error = {};
        this.errorMsg = error.message;
      }

    });
  }

  savePeriod(localSessionData){
    let tenant={
      'tenant_id':localSessionData.tenant_id
    }
    this.periodService.getPeriod(tenant)
      .then(
        (response) => {
          if (response.status === AppConstants.successStatus) {
            this.periodResults=response.data;
          }
          else {
            this.errorMsg=response.message;
          }
        }).catch((error) => {

      if (error.json().code == null) {
        this.error = {
          message: error.statusText,
          status: error.status
        };
      } else {
        this.error = {};
        this.errorMsg = error.message;
      }

    });
  }

}
