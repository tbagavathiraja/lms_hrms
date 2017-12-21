import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {HolidayService} from "./holiday.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'holiday-summary',
  templateUrl: './holiday.component.html',
})
export class HolidayComponent implements OnInit {
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
    leave_id;
    toDatePickerOptions1;
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
        protected holidayService:HolidayService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService
    ){
        this.appComponent.showIncludes=true;

    }
    getAllholiday(){
      this.storedDetail=this.localStorage.getObject('storedDetails');
      let employee_id=this.storedDetail.employee_id;
       let tenant = {"search":this.search,"employee_id":employee_id};
        this.isLoading = true;
        this.holidayService.getAllholiday(tenant).then( (res)=> {
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
}
