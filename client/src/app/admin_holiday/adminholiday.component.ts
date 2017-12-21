import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AdminHolidayService} from "./adminholiday.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './adminholiday.component.html',
})
export class AdminHolidayComponent implements OnInit {
    errMessage = "";
    success:boolean;
    success_message:string;
    error={};
    protected storedDetail;
    screen_name;
    isLoading:boolean;
    holidayDetail;
    itemCount=0;
    items = [];
    error_status:boolean;
    search;
    saveDetail;
    types;
    holiday_id;
    departments;
    toDatePickerOptions1;
    locations;
    datePickerOptions: IMyDpOptions  = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
    };
    constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
        // public modal:Modal,
        protected adminholidayService:AdminHolidayService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService
    ){
        this.appComponent.showIncludes=true;

    }
    getAllholiday(){
        let tenant = {"search":this.search};
        this.isLoading = true;
        this.adminholidayService.getAllholiday(tenant).then( (res)=> {
          console.log(res)
            if(res.message == 'No records found') {
                this.isLoading = false;
                this.itemCount = 0;
            }else {
                this.isLoading = false;
                this.holidayDetail = new DataTableResource(res.data);
                this.itemCount = res.data.length;
            }
        }).catch(function(err){
        })
    }

    reloadItems(params) {
        this.holidayDetail.query(params).then(items => this.items = items);
    }
    validate(){
        if(!this.saveDetail.holiday_name || this.saveDetail.holiday_name == ''){
            this.error_status = true;
            this.errMessage = "Please enter holiday name";
            return false;
        }
        if(!this.saveDetail.holiday_date || this.saveDetail.holiday_date == ''){
            this.error_status = true;
            this.errMessage = "Please select holiday date";
            return false;
        }
        if(!this.saveDetail.location_id || this.saveDetail.location_id == ''){
            this.error_status = true;
            this.errMessage = "Please select location";
            return false;
        }
        console.log(this.saveDetail.department_id);
        if(!this.saveDetail.department_id || this.saveDetail.department_id == ''){
            this.error_status = true;
            this.errMessage = "Please select department";
            return false;
        }
        this.error_status = false;
        this.errMessage = "";
        return true;
    }
    delete_modal(leave_id,modal){
        this.holiday_id = leave_id;
        modal.open();
    }
    delete_holiday(deleteModal){
        let deleteParam = {"holiday_id":this.holiday_id};
        this.isLoading = true;
        this.adminholidayService.delete_holiday(deleteParam)
        .then((leaveata) =>{
            if(leaveata.status === AppConstants.successStatus){
                this.isLoading = false;
                this.getAllholiday();
                this.success=true;
                deleteModal.close();
                this.success_message='Holiday Deleted Successfully'
            }
        });
    }
    ngOnInit() {
        this.errMessage = "";
        let success_msg = this.appservice.getter();
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.getAllholiday();
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

    getlocation() {
        this.adminholidayService.getlocation().then((res) => {
            this.locations = res.data;
        }).catch(function (err) {
            console.log(err);
        })
    }
    getdepartments() {
        this.adminholidayService.getdepartment().then((res) => {
            this.departments = res.data;
        }).catch(function (err) {
            console.log(err);
        })
    }
}

@Component({
  selector: 'app-request',
    templateUrl: './addholiday.component.html',
})
export class AddHolidayComponent extends AdminHolidayComponent {

    ngOnInit(): void {
        this.screen_name = "Add ";
        this.saveDetail = {holiday_name:'',holiday_date:'',location_id:'',tenant_id:'',department_id:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.getlocation();
        this.getdepartments();
        this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        componentDisabled:false,
      };
    }
    save_holiday() {
        if(!this.validate()){
            return false;
        }
      this.saveDetail.tenant_id = 1;
        console.log(this.saveDetail)
      this.adminholidayService.insertHoliday(this.saveDetail).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Holiday added successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/admin-holiday']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

@Component({
  selector: 'app-request',
    templateUrl: './addholiday.component.html',
})

export class EditHolidayComponent extends AdminHolidayComponent {

    ngOnInit(): void {
        this.screen_name = "Edit ";
        this.saveDetail = {holiday_name:'',holiday_date:'',location_id:'',department_id:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.activatedRoute.params.subscribe((params: Params) => {
             this.holiday_id = params['holiday_id'];
        });
        this.get_details(this.holiday_id);
        this.getlocation();
        this.getdepartments();
        this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        componentDisabled:false,
      };
    }
    get_details(holiday_id) {
        this.adminholidayService.getHolidayDetails(holiday_id).then((res)=> {
            if(res.status === AppConstants.successStatus) {
                this.saveDetail = res.data[0];
                var holiday_date = new Date(moment(res.data[0].holiday_date,"DD-MM-YYYY").toDate());
                this.saveDetail.holiday_date = { date: { year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate() }, jsdate: holiday_date, formatted: res.data[0].holiday_date }
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    save_holiday() {
        if(!this.validate()){
            return false;
        }
        this.adminholidayService.updateHoliday(this.saveDetail,this.holiday_id).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Holiday updated successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/admin-holiday']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

}
