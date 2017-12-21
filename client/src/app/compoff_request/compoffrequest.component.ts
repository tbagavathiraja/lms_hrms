import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {CompoffRequestService} from "./compoffrequest.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './compoffrequest.component.html',
})
export class CompoffRequestComponent implements OnInit {

   showrecords:boolean;
    errMessage = "";
    success:boolean;
    success_message:string;
    error={};
    protected storedDetail;
    screen_name;
    isLoading:boolean;
	  employee_email;
    itemCount=0;
    items = [];
    error_status:boolean;
    search;
    Compoffs;
    compoff_id;
    toDatePickerOptions1;
    saveDetail;

  constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
        protected CompoffRequestService:CompoffRequestService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService
    ){
        this.appComponent.showIncludes=true;
    }

  ngOnInit() {
    this.errMessage = "";
    let success_msg = this.appservice.getter();
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.getAllCompoff();
     if(success_msg){
      if(success_msg.success){
        this.success = true;
        this.success_message = success_msg.message;
        let success = {success:false,message:""};
        this.appservice.setter(success);
      }else{
        this.success = false;
      }

    }else{
      this.success = false;
    }
  }

  validate(){
    if(!this.saveDetail.worked_on || this.saveDetail.worked_on == ''){
      this.error_status = true;
      this.errMessage = "Please Enter Worked On";
      return false;
    }
    if(!this.saveDetail.leave_on || this.saveDetail.leave_on == ''){
      this.error_status = true;
      this.errMessage = "Please Enter Leave On";
      return false;
    }
    if(!this.saveDetail.description || this.saveDetail.description == ''){
      this.error_status = true;
      this.errMessage = "Please Enter Description";
      return false;
    }
    return true;
  }



  reloadItems(params) {
    this.Compoffs.query(params).then(items => this.items = items);
  }

  delete_modal(compoff_id,modal){
    this.compoff_id = compoff_id;
    modal.open();
  }

  delete_confirm(deleteModal){
    let deleteParam = {"compoff_id":this.compoff_id};
    this.isLoading = true;
    this.CompoffRequestService.delete_compoff(deleteParam)
      .then((compoffdata) =>{
        if(compoffdata.status === AppConstants.successStatus){
          this.isLoading = false;
          this.getAllCompoff();
          this.success=true;
          this.success_message='Compoff Deleted Successfully';
          deleteModal.close();

        }
      });
  }

  getAllCompoff(){
    let tenant = {"employee_id":this.storedDetail.employee_id,"search":this.search};
    this.isLoading = true;
    this.CompoffRequestService.getAllCompoff(tenant).then( (res)=> {
      if(res.message == 'No records found') {
        this.isLoading = false;
        this.itemCount = 0;
      }else{
        if(res.status == AppConstants.successStatus) {
          this.isLoading = false;
           this.Compoffs = res.data;
          this.Compoffs = new DataTableResource(res.data);
          this.itemCount = res.data.length;
        }
      }
    }).catch(function(err){
      console.log(err);
    })
  }



}
@Component({
  selector: 'app-request',
    templateUrl: './addcompoffrequest.component.html',
})
export class AddCompoffRequestComponent extends CompoffRequestComponent {

  holidays=[];


  datePickerOptions:IMyDpOptions= {
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField:false,
    disableDays:this.holidays,
    componentDisabled:false,
  };

  get_date(){
    if(this.saveDetail['worked_on']){
      var today = new Date(this.saveDetail['worked_on'].jsdate);
      var yesterday = new Date(today.getTime() - (24*60*60*1000));
      var disable_date = {year:today.getFullYear(),month:today.getMonth()+1,day:today.getDate()};
      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        disableUntil:disable_date,
        disableDays:this.holidays,
        componentDisabled:false,
      };
    }else{
      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        disableDays:this.holidays,
        componentDisabled:true,
      };
    }
    return this.toDatePickerOptions1;
  }


  ngOnInit(): void {
    this.screen_name = "Add ";
    this.saveDetail = {worked_on:'',leave_on:'',description:''};
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.getholiday();

  }
  save_compoff(permissionModal) {
    if(!this.validate()){
      return false;
    }
    this.saveDetail["employee_id"]=this.storedDetail.employee_id;
    this.saveDetail["employee_email"]=this.storedDetail.employee_email;
    this.saveDetail["employee_name"]=this.storedDetail.employee_name;
    this.CompoffRequestService.insertCompoff(this.saveDetail).then((res) => {
      if(res.status == AppConstants.successStatus){
        let success = {success:true,message:"Compoff Request Sent Successfully"};
        this.appservice.setter(success);
        this.router.navigate(['/compoff-request']);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  getholiday(){
      let params={"employee_id":this.storedDetail.employee_id}
    this.CompoffRequestService.get_compoff_holidays(params).then((res) =>{
      console.log(res.data);
      if(res.status === AppConstants.successStatus) {
        const holiday = res.data.holiday;
        for(const x in holiday){
          var holiday_date = new Date(holiday[x]['holiday_date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }

        const granted =res.data.granted;
        for(const x in granted){
          var dates = [];
          var  workedDate=new Date(granted[x]['worked_on']);
          var leaveDate=new Date(granted[x]['leave_on']);
          dates.push({year: workedDate.getFullYear(), month: workedDate.getMonth()+1, day: workedDate.getDate()});
          dates.push({year: leaveDate.getFullYear(), month: leaveDate.getMonth()+1, day: leaveDate.getDate()});
          for (const y in dates){
            this.holidays.push(dates[y]);
          }
        }

      const initial =res.data.initial;
        for(const x in initial){
          var dates = [];
          var  workedDate=new Date(initial[x]['worked_on']);
          var leaveDate=new Date(initial[x]['leave_on']);
          dates.push({year: workedDate.getFullYear(), month: workedDate.getMonth()+1, day: workedDate.getDate()});
          dates.push({year: leaveDate.getFullYear(), month: leaveDate.getMonth()+1, day: leaveDate.getDate()});
          for (const y in dates){
            this.holidays.push(dates[y]);
          }
        }

       };
    });
  }


}

@Component({
  selector: 'app-request',
  templateUrl: './addcompoffrequest.component.html',
})
export class EditCompoffRequestComponent extends CompoffRequestComponent {

  holidays=[];
  datePickerOptions:IMyDpOptions= {
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField:false,
    disableDays:this.holidays,
    componentDisabled:false,
  };

  ngOnInit(): void {
    this.screen_name = "Edit ";
    this.saveDetail = {worked_on:'',leave_on:'',description:''};
    this.storedDetail=this.localStorage.getObject('storedDetails');
        this.activatedRoute.params.subscribe((params: Params) => {
      this.compoff_id = params['compoff_id'];
    });
    this.get_details(this.compoff_id);
    this.getholiday();
  }

  get_details(compoff_id) {
    let compoffId={"compoff_id":compoff_id};
    this.CompoffRequestService.get_edit_details(compoffId).then((res)=> {
      if(res.status === AppConstants.successStatus) {
        this.saveDetail = res.data[0];
        var from_date = new Date(moment(res.data[0].worked_on,"DD-MM-YYYY").toDate());
        this.saveDetail.worked_on = { date: { year: from_date.getFullYear(), month: from_date.getMonth()+1, day: from_date.getDate() }, jsdate: from_date, formatted: res.data[0].from_date }
        var to_date = new Date(moment(res.data[0].leave_on,"DD-MM-YYYY").toDate());
        this.saveDetail.leave_on = { date: { year: to_date.getFullYear(), month: to_date.getMonth()+1, day: to_date.getDate() }, jsdate: to_date, formatted: res.data[0].to_date }
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  save_compoff(compoffModal) {
    if(!this.validate()){
      return false;
    }
    this.saveDetail["employee_id"]=this.storedDetail.employee_id;
    this.CompoffRequestService.updatecompoff(this.saveDetail).then((res) => {
      if(res.status == AppConstants.successStatus){
        let success = {success:true,message:"Compoff Request updated successfully"};
        this.appservice.setter(success);
        this.router.navigate(['/compoff-request']);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

    get_date(){
    if(this.saveDetail['worked_on']){
      var today = new Date(this.saveDetail['worked_on'].jsdate);
      var yesterday = new Date(today.getTime() - (24*60*60*1000));
      var disable_date = {year:today.getFullYear(),month:today.getMonth()+1,day:today.getDate()};
      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        disableUntil:disable_date,
        disableDays:this.holidays,
        componentDisabled:false,
      };
    }else{
      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        disableDays:this.holidays,
        componentDisabled:true,
      };
    }
    return this.toDatePickerOptions1;
  }


  getholiday(){
    let params={"employee_id":this.storedDetail.employee_id};
    this.CompoffRequestService.get_compoff_holidays(params).then((res) =>{
      console.log(res.data);
      if(res.status === AppConstants.successStatus) {

        const holiday = res.data.holiday;
        for(const x in holiday){
          var holiday_date = new Date(holiday[x]['holiday_date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }

        const granted =res.data.granted;
        for(const x in granted){
          var dates = [];
          var  workedDate=new Date(granted[x]['worked_on']);
          var leaveDate=new Date(granted[x]['leave_on']);
          dates.push({year: workedDate.getFullYear(), month: workedDate.getMonth()+1, day: workedDate.getDate()});
          dates.push({year: leaveDate.getFullYear(), month: leaveDate.getMonth()+1, day: leaveDate.getDate()});
          for (const y in dates){
            this.holidays.push(dates[y]);
          }
        }
      };
    });
  }



}

