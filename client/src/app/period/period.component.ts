import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppConstants, ErrorConstants} from "../app.constant";
import {PeriodService} from "../period/period.service";
import {AppService} from "../app.service";
import { IMyDpOptions } from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

  public errorMsg;
  public successMsg;
  private storedDetail;
  periodResults;
  itemCount =0;
  items = [];
  private error = {};
    protected delete_id;
    isLoading:boolean;
    search;
  success:boolean;
  success_message:string;

  constructor(
  private router :Router,
  private appComponent:AppComponent,
  private activatedRoute: ActivatedRoute,
  public localStorage: CoolLocalStorage,
  private periodService:PeriodService,
  protected appService:AppService,
) {
    this.appComponent.showIncludes=true;
  }

  ngOnInit() {
    this.errorMsg = "";
    this.successMsg="";
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.periodSummary();
    let success_msg = this.appService.getter();
    if(success_msg){
      if(success_msg.success){
        this.success = true;
        this.success_message = success_msg.message;
        let success = {success:false,message:""};
        this.appService.setter(success);
      }else{
        this.success = false;
      }

    }else{
      this.success = false;
    }
  }

  reloadItems(params) {
    if(this.periodResults){
      this.periodResults.query(params).then(items => this.items = items);
    }

  }

  periodSummary(){
    this.isLoading = true;
    let tenant={
        'tenant_id':this.storedDetail.tenant_id,
          'search':this.search
      }
      this.periodService.getPeriod(tenant).then((response) => {
            if(response.code === 1056) {
              this.isLoading = false;
              this.itemCount = 0;
            } else {
              if (response.status === AppConstants.successStatus) {
                this.isLoading = false;
                this.itemCount = 0;
                this.periodResults = new DataTableResource(response.data);
                this.itemCount = response.data.length;

              }
              else {
                this.error=this.periodResults;
              }
            }
            this.reloadItems({offset: 0, limit: 15});
            this.isLoading = false;
          }).catch((error) => {
        this.isLoading = false;
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

  delete_period(period_id,deleteModal) {
    this.delete_id = period_id;
    deleteModal.open();
  }

  delete_confirm(deleteModal):void{
    let deleteParam = {"delete_id":this.delete_id};
    this.isLoading = true;
    this.periodService.delete_period(deleteParam)
      .then(
        (response) =>{
            this.isLoading = false;
          if(response.status === AppConstants.successStatus){
            this.successMsg = {success : true,message : "Period Deleted Successfully"};
              deleteModal.close();
            this.periodSummary();
          }
          else{
              this.error=response;
              this.errorMsg=response.message;
              this.successMsg = "";
              deleteModal.close();
            }
        }).catch((error)=>{
            this.isLoading = false;
        deleteModal.close();
      if(error.json().code==null){
        this.error={
          message:error.statusText,
          status:error.status
        };
        this.successMsg = "";
      }else{
        this.error={};
        this.errorMsg=error.message;
        this.successMsg = "";
      }

    });
  }

}

export class DatePickerParams {
    toDatePickerOptions1;
    toDatePickerOptions2;
    toDatePickerOptions3;
    end_date(period_data){
        if(period_data.start_date){
            if(period_data.start_date.jsdate){
                var today = new Date(period_data.start_date.jsdate);
                var yesterday = new Date(today.getTime() - (24*60*60*1000));
                var disable_date = {year:yesterday.getFullYear(),month:yesterday.getMonth()+1,day:yesterday.getDate()};
                this.toDatePickerOptions1 = {
                dateFormat: 'dd-mm-yyyy',
                  inline: false,
                  sunHighlight: true,
                  satHighlight: true,
                  editableDateField:false,
                  disableUntil:disable_date,
                  componentDisabled:false,
                };
                return this.toDatePickerOptions1;
            }
        }
        this.toDatePickerOptions1 = {
            dateFormat: 'dd-mm-yyyy',
              inline: false,
              sunHighlight: true,
              satHighlight: true,
              editableDateField:false,
              componentDisabled:true,
            };
        return this.toDatePickerOptions1;
    }
    submission_end_date_obj(period_data){
        if(period_data.submission_start_date){
            if(period_data.submission_start_date.jsdate){
                var today1 = new Date(period_data.submission_start_date.jsdate);
                var yesterday1 = new Date(today1.getTime() - (24*60*60*1000));
                var disable_date1 = {year:yesterday1.getFullYear(),month:yesterday1.getMonth()+1,day:yesterday1.getDate()};
                this.toDatePickerOptions2 = {
                dateFormat: 'dd-mm-yyyy',
                  inline: false,
                  sunHighlight: true,
                  satHighlight: true,
                  editableDateField:false,
                  disableUntil:disable_date1,
                  componentDisabled:false,
                };
                return this.toDatePickerOptions2;
            }

        }

        this.toDatePickerOptions2 = {
          dateFormat: 'dd-mm-yyyy',
          inline: false,
          sunHighlight: true,
          satHighlight: true,
          editableDateField:false,
          componentDisabled:true,
        };
        return this.toDatePickerOptions2;
    }

    resubmission_end_date_obj(period_data){
        if(period_data.submission_end_date){
            if(period_data.submission_end_date.jsdate){
                var today2 = new Date(period_data.submission_end_date.jsdate);

                var yesterday2 = new Date(today2.getTime() - (24*60*60*1000));
                var disable_date2 = {year:yesterday2.getFullYear(),month:yesterday2.getMonth()+1,day:yesterday2.getDate()};
                this.toDatePickerOptions3 = {
                dateFormat: 'dd-mm-yyyy',
                  inline: false,
                  sunHighlight: true,
                  satHighlight: true,
                  editableDateField:false,
                  disableUntil:disable_date2,
                  componentDisabled:false,
                };
                return this.toDatePickerOptions3;
            }
        }
        this.toDatePickerOptions3 = {
        dateFormat: 'dd-mm-yyyy',
          inline: false,
          sunHighlight: true,
          satHighlight: true,
          editableDateField:false,
          componentDisabled:true,
        };
        return this.toDatePickerOptions3;

    }
}

@Component({
  selector: 'app-period',
  templateUrl: './addeditperiod.component.html',
  styleUrls: ['./period.component.css']
})

export class AddPeriodComponent extends DatePickerParams implements OnInit {

  private errorMsg;
  private successMsg;
  private storedDetail;
  private periodResults = [];
  private error;
  protected period_data;
  heading ='Add Period';
  myDatePickerOptions = {
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField:false,
  }
    isLoading:boolean;

  constructor(
    private router :Router,
    private appComponent:AppComponent,
    private activatedRoute: ActivatedRoute,
    public localStorage: CoolLocalStorage,
    private periodService:PeriodService,
    private appService:AppService,
    //public myDatePickerOptions: IMyDpOptions
   ) {
    super();
    this.appComponent.showIncludes=true;
  }

  ngOnInit() {
    this.errorMsg = "";
    this.successMsg="";
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.period_data = {
      start_date : {},
      end_date : {},
      submission_start_date : {},
      submission_end_date: {},
      resubmission_end_date: {},
    };
  }

  validate():boolean{
    if(!this.period_data.start_date.date || this.period_data.start_date.date == ""){
      this.error= true;
      this.errorMsg = "Please select start date";
      return false;
    }

    if(!this.period_data.end_date.date || this.period_data.end_date.date === ""){
      this.error= true;
      this.errorMsg = "Please select end date";
      return false;
    }

    if(!this.period_data.submission_start_date.date || this.period_data.submission_start_date.date === ""){
      this.error= true;
      this.errorMsg = "Please select submission start date";
      return false;
    }

    if(!this.period_data.submission_end_date.date || this.period_data.submission_end_date.date === ""){
      this.error= true;
      this.errorMsg = "Please select submission end date";
      return false;
    }

    if(!this.period_data.resubmission_end_date.date || this.period_data.resubmission_end_date.date === ""){
      this.error= true;
      this.errorMsg = "Please select resubmission end date";
      return false;
    }
    this.error = false;
    return true;
  }

  savePeriod(){

    let validate = this.validate();
    if(validate) {
      this.isLoading = true;
      let localSessionData = this.storedDetail;
      this.period_data.tenant_id = localSessionData.tenant_id

      this.periodService.addPeriod(this.period_data)
        .then(
          (response) => {
              this.isLoading = false;
            if (response.status === AppConstants.successStatus) {
              this.periodResults = response.data;
              let success = {success:true,message:"Period Added Successfully"};
              this.appService.setter(success);
              this.router.navigate(['/period']);
            }
            else {
                this.error = true;
              this.errorMsg = response.message;

            }
          }).catch((error) => {
        this.isLoading = false;
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

}


@Component({
  selector: 'app-period',
  templateUrl: './addeditperiod.component.html',
  styleUrls: ['./period.component.css']
})

export class EditPeriodComponent extends DatePickerParams implements OnInit {

  private errorMsg;
  private successMsg;
  private storedDetail;
  private periodResults = [];
  private error;
  protected period_data;
  heading ='Edit Period';
    isLoading:boolean;
  myDatePickerOptions = {
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField:false,
  }
  constructor(
    private router :Router,
    private appComponent:AppComponent,
    private activatedRoute: ActivatedRoute,
    public localStorage: CoolLocalStorage,
    private periodService:PeriodService,
    protected appService:AppService
  ) {
    super();
    this.appComponent.showIncludes=true;
  }

  ngOnInit() {
    this.errorMsg = "";
    this.successMsg="";
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.period_data = {
      start_date : "",
      end_date : "",
      submission_start_date : "",
      submission_end_date: "",
      resubmission_end_date: "",
    };
    this.end_date(this.period_data);
    this.getPeriodData(this.storedDetail);
  }

  validate():boolean{
    if(!this.period_data.start_date || this.period_data.start_date == ""){
      this.error= true;
      this.errorMsg = "Please select start date";
      return false;
    }

    if(!this.period_data.end_date || this.period_data.end_date === ""){
      this.error= true;
      this.errorMsg = "Please select end date";
      return false;
    }

    if(!this.period_data.submission_start_date || this.period_data.submission_start_date === ""){
      this.error= true;
      this.errorMsg = "Please select submission start date";
      return false;
    }

    if(!this.period_data.submission_end_date || this.period_data.submission_end_date === ""){
      this.error= true;
      this.errorMsg = "Please select submission end date";
      return false;
    }

    if(!this.period_data.resubmission_end_date || this.period_data.resubmission_end_date === ""){
      this.error= true;
      this.errorMsg = "Please select resubmission end date";
      return false;
    }

    this.error = false;
    return true;
  }

  getPeriodData(localSessionData){
      this.isLoading = true;
    this.activatedRoute.params.subscribe((params: Params) => {

      let obj={
        'tenant_id':localSessionData.tenant_id,
        'period_id':params['period_id']
      }
      this.periodService.getPeriod(obj)
        .then(
          (response) => {
              this.isLoading = false;
            if (response.status === AppConstants.successStatus) {
              this.period_data = response.data[0];
                var start_date = new Date(moment(response.data[0].start_date,"DD-MM-YYYY").toDate());
                var end_date = new Date(moment(response.data[0].end_date,"DD-MM-YYYY").toDate());
                var submission_start_date = new Date(moment(response.data[0].submission_start_date,"DD-MM-YYYY").toDate());
                var submission_end_date = new Date(moment(response.data[0].submission_end_date,"DD-MM-YYYY").toDate());
                var resubmission_end_date = new Date(moment(response.data[0].resubmission_end_date,"DD-MM-YYYY").toDate());
                this.period_data.start_date = { date: { year: start_date.getFullYear(), month: start_date.getMonth()+1, day: start_date.getDate() }, jsdate: start_date, formatted: response.data[0].start_date }
                this.period_data.end_date = { date: { year: end_date.getFullYear(), month: end_date.getMonth()+1, day: end_date.getDate() }, jsdate: end_date, formatted: response.data[0].end_date }
                this.period_data.submission_start_date = { date: { year: submission_start_date.getFullYear(), month: submission_start_date.getMonth()+1, day: submission_start_date.getDate() }, jsdate: submission_start_date, formatted: response.data[0].submission_start_date }
                this.period_data.submission_end_date = { date: { year: submission_end_date.getFullYear(), month: submission_end_date.getMonth()+1, day: submission_end_date.getDate() }, jsdate: submission_end_date, formatted: response.data[0].submission_end_date }
                this.period_data.resubmission_end_date = { date: { year: resubmission_end_date.getFullYear(), month: resubmission_end_date.getMonth()+1, day: resubmission_end_date.getDate() }, jsdate: resubmission_end_date, formatted: response.data[0].resubmission_end_date }
            }
            else {
                this.error = true;
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
    });


  }

  savePeriod(period_id){
      console.log('a');
    if(!this.validate()){
      return;
    }
      this.isLoading = true;
    let localSessionData = this.storedDetail;
    let params= this.period_data;
    params.tenant_id = localSessionData.tenant_id;

    this.periodService.updatePeriod(params)
      .then(
        (response) => {
            this.isLoading = false;
          if (response.status === AppConstants.successStatus) {
            this.periodResults=response.data;
            let success = {success:true,message:"Period Updated Successfully"};
            this.appService.setter(success);
            this.router.navigate(['/period']);
          }
          else {
            this.error = true;
               this.error = true;
            this.errorMsg=response.message;
          }
        }).catch((error) => {
      if (error.json().code == null) {
        this.error = {
          message:
          error.statusText,
          status: error.status
        };
      } else {
        this.error = {};
        this.errorMsg = error.message;
      }

    });
  }

}
