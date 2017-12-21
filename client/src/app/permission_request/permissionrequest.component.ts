import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {PermissionRequestService} from "./permissionrequest.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
 import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';
declare var $: any;

@Component({
  selector: 'app-summary',
  templateUrl: './permissionrequest.component.html',
})
export class PermissionRequestComponent implements OnInit {

  error={};
  protected storedDetail;
  saveDetail;
  permissions;
  mypermission={};
  error_status:boolean;
  screen_name;
  errMessage = "";
  totalpermission=[];
  mypermissions={};
  employee_mail;
  itemCount = 0;
  items = [];
  isLoading:boolean;
  delete_id;
  showrecords:boolean;
  showMsg;
  search;
  editpermissionDetail;
  DatePickerOptions;
  success:boolean;
  success_message:string;
  permission_id;

  public Employee_id;
  public Employee_name;





  constructor(
              private appComponent:AppComponent,
              protected activatedRoute: ActivatedRoute,
              public permissionRequestService: PermissionRequestService,
              public localStorage: CoolLocalStorage,
              protected appservice:AppService,
              protected route :ActivatedRoute,
              protected router :Router,
  ) {

              this.appComponent.showIncludes=true; }

  ngOnInit() {
    this.errMessage = "";
    let success_msg = this.appservice.getter();
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.getAllPermission();
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
    if(!this.saveDetail.reason || this.saveDetail.reason == ''){
      this.error_status = true;
      this.errMessage = "Please enter reason";
      return false;
    }
    if(!this.saveDetail.date || this.saveDetail.date == ''){
      this.error_status = true;
      this.errMessage = "Please Select Date";
      return false;
    }
    if(!this.saveDetail.from_time || this.saveDetail.from_time == ''){
      this.error_status = true;
      this.errMessage = "Please Enter From Time";
      return false;
    }
    if(!this.saveDetail.to_time || this.saveDetail.to_time == ''){
      this.error_status = true;
      this.errMessage = "Please Enter To Time";
      return false;
    }
    return true;

  }

  get_date(){
      var today = new Date();
      var yesterday = new Date(today.getTime() - (24*60*60*1000));
      var disable_date = {year:yesterday.getFullYear(),month:yesterday.getMonth()+1,day:yesterday.getDate()};
      this.DatePickerOptions = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        disableUntil:disable_date,
        componentDisabled:false,
      };
    return this.DatePickerOptions;

  }



  reloadItems(params) {
    this.permissions.query(params).then(items => this.items = items);
  }

  getAllPermission(){
    let getall={"employee_id":this.storedDetail.employee_id,"search":this.search};
    this.isLoading = true;
    this.permissionRequestService.getAllPermission(getall).then( (res)=>{
        console.log(res.data)
      if(res.message == 'No records found') {
        this.isLoading = false;
        this.itemCount = 0;
      }else{
        if(res.status == AppConstants.successStatus){
          this.isLoading = false;
          this.permissions = res.data;
          this.permissions = new DataTableResource(res.data);
          this.itemCount = res.data.length;
        }
      }
    }).catch(function(err){
      console.log(err);
    })
  }

  delete_modal(permission_id,modal){
    this.delete_id = permission_id;
    modal.open();
  }

  delete_confirm(deleteModal){
    let deleteParam = {"permission_id":this.delete_id };
    this.isLoading = true;
    this.permissionRequestService.delete_permission(deleteParam)
      .then(
        (employeedata) =>{
          if(employeedata.status === AppConstants.successStatus){
            this.isLoading = false;
            this.getAllPermission();
            this.success=true;
            deleteModal.close();
            this.success_message='Permission Deleted Successfully'
          }
        });

  }


}
@Component({
  selector: 'app-request',
    templateUrl: './addpermissionrequest.component.html',
})
export class AddPermissionRequestComponent extends PermissionRequestComponent {

  holidays=[];

  ngOnInit(): void {
    this.screen_name = "Add ";
    this.saveDetail = {reason:'',date:'',from_time:'',to_time:''};
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.getholiday();

  }

  get_date(){
    var today = new Date();
    var yesterday = new Date(today.getTime() - (24*60*60*1000));
    var disable_date = {year:yesterday.getFullYear(),month:yesterday.getMonth()+1,day:yesterday.getDate()};
    this.DatePickerOptions = {
      dateFormat: 'dd-mm-yyyy',
      inline: false,
      sunHighlight: true,
      satHighlight: true,
      editableDateField:false,
      disableUntil:disable_date,
      disableDays:this.holidays,
      componentDisabled:false,
    };
    return this.DatePickerOptions;

  }

  save_permission(permissionModal) {
    if(!this.validate()){
      return false;
    }
    this.saveDetail["employee_id"]=this.storedDetail.employee_id;
    this.saveDetail["employee_email"]=this.storedDetail.employee_email;
    this.saveDetail["employee_name"]=this.storedDetail.employee_name;
    this.permissionRequestService.insertPermission(this.saveDetail).then((res) => {
      if(res.status == AppConstants.successStatus){
        let success = {success:true,message:"Permission Request Sent Successfully"};
        this.appservice.setter(success);
        this.router.navigate(['/permission-request']);
      }
    }).catch((err) => {
      console.log(err);
    })
  }


  getholiday(){
    let params={"employee_id":this.storedDetail.employee_id}
    this.permissionRequestService.get_permission_holidays(params).then((res) =>{
       if(res.status === AppConstants.successStatus) {
        const holiday = res.data.holiday;
        for(const x in holiday){
          var holiday_date = new Date(holiday[x]['holiday_date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }

        const granted =res.data.granted;
        for(const x in granted){
          var holiday_date = new Date(granted[x]['date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }
        }

        const initial =res.data.initial;
        for(const x in initial){
          var holiday_date = new Date(initial[x]['date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});

        }

    });
  }




}
@Component({
  selector: 'app-request',
  templateUrl: './addpermissionrequest.component.html',
})

export class EditPermissionRequestComponent extends PermissionRequestComponent {

  holidays=[];

  ngOnInit(): void {
    this.screen_name = "Edit ";
    this.saveDetail = {reason:'',from_time:'',to_time:'',date:''};
    this.storedDetail=this.localStorage.getObject('storedDetails');
     this.activatedRoute.params.subscribe((params: Params) => {
      this.permission_id = params['permission_id'];
    });
    this.get_details(this.permission_id);
    this.getholiday()
  }

  get_date(){
    var today = new Date();
    var yesterday = new Date(today.getTime() - (24*60*60*1000));
    var disable_date = {year:yesterday.getFullYear(),month:yesterday.getMonth()+1,day:yesterday.getDate()};
    this.DatePickerOptions = {
      dateFormat: 'dd-mm-yyyy',
      inline: false,
      sunHighlight: true,
      satHighlight: true,
      editableDateField:false,
      disableUntil:disable_date,
      disableDays:this.holidays,
      componentDisabled:false,
    };
    return this.DatePickerOptions;

  }


  get_details(permission_id) {
    let permissionId={"permission_id":permission_id};
    this.permissionRequestService.get_edit_details(permissionId).then((res)=> {
      if(res.status === AppConstants.successStatus) {
        this.saveDetail = res.data[0];
        var date = new Date(moment(res.data[0].date,"DD-MM-YYYY").toDate());
        this.saveDetail.date = { date: { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate() }, jsdate: date, formatted: res.data[0].date }
       }
    }).catch((err)=>{
      console.log(err);
    })
  }

  save_permission(permissionModal) {
    if(!this.validate()){
      return false;
    }
    this.saveDetail["employee_id"]=this.storedDetail.employee_id;
    this.permissionRequestService.updatepermission(this.saveDetail).then((res) => {
      if(res.status == AppConstants.successStatus){
        let success = {success:true,message:"Permission Request Updated Successfully"};
        this.appservice.setter(success);
        this.router.navigate(['/permission-request']);
      }
    }).catch((err) => {
      console.log(err);
    })
  }


  getholiday(){
    let params={"employee_id":this.storedDetail.employee_id}
    this.permissionRequestService.get_permission_holidays(params).then((res) =>{
       if(res.status === AppConstants.successStatus) {
        const holiday = res.data.holiday;
        for(const x in holiday){
          var holiday_date = new Date(holiday[x]['holiday_date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }

        const granted =res.data.granted;
        for(const x in granted){
          var holiday_date = new Date(granted[x]['date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }
      }
    });
  }



}

