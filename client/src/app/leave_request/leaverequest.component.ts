import { Component, OnInit, DoCheck } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {LeaveRequestService} from "./leaverequest.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './leaverequest.component.html',
})
export class LeaveRequestComponent implements OnInit {

    errMessage = "";
    success:boolean;
    success_message:string;
    error={};
    protected storedDetail;
    screen_name;
    isLoading:boolean;
	  employee_email;
    leaves;
    itemCount=0;
    items = [];
    error_status:boolean;
    search;
    saveDetail;
    types;
    leave_id;
    holidays;



  constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
        protected leaverequestService:LeaveRequestService,
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
    this.holidays={holiday_date:'',holiday_name:''};
    this.getAllleave();
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

  delete_modal(leave_id,modal){
        this.leave_id = leave_id;
        modal.open();
    }
    delete_leave(deleteModal){
        let deleteParam = {"leave_id":this.leave_id};
        this.isLoading = true;
        this.leaverequestService.delete_leave(deleteParam)
        .then((leavedata) =>{
            if(leavedata.status === AppConstants.successStatus){
                this.isLoading = false;
                this.getAllleave();
                this.success=true;
                deleteModal.close();
                this.success_message='Leave Deleted Successfully'
            }
        });
    }

    getAllleave(){
        this.isLoading = true;
        let getall={"employee_id":this.storedDetail.employee_id,"search":this.search};
        this.leaverequestService.getAllleave(getall).then( (res)=> {
          if(res.message == 'No records found') {
            this.isLoading = false;
              this.itemCount = 0;
          } else{
            if(res.status === AppConstants.successStatus) {
                  var data =res.data
                  this.isLoading = false;
                  this.leaves=res.data;
                  this.leaves = new DataTableResource(res.data);
                  this.itemCount = res.data.length;
            }

          }
        }).catch(function(err){
            console.log(err);
        })
    }

    reloadItems(params) {
        this.leaves.query(params).then(items => this.items = items);
    }

    validate(){
        if(!this.saveDetail.leave_type || this.saveDetail.leave_type == ''){
            this.error_status = true;
            this.errMessage = "Please select leave type";
            return false;
        }
        if(!this.saveDetail.reason || this.saveDetail.reason == ''){
            this.error_status = true;
            this.errMessage = "Please enter reason";
            return false;
        }
        if(!this.saveDetail.from_date || this.saveDetail.from_date == ''){
            this.error_status = true;
            this.errMessage = "Please select from date";
            return false;
        }if(this.saveDetail.leave_type =='full-day'){
         if(!this.saveDetail.to_date || this.saveDetail.to_date == ''){
         this.error_status = true;
         this.errMessage = "Please select to date";
         return false;
        }
        }
        if(!this.saveDetail.number_of_days || this.saveDetail.number_of_days == ''){
            this.error_status = true;
            this.errMessage = "Please enter number of days";
            return false;
        }
        var from_date = new Date(this.saveDetail['from_date'].jsdate);
        var to_date = new Date(this.saveDetail['to_date'].jsdate);
        var diff = to_date.getTime() - from_date.getTime();
        if(diff < 0){
            this.error_status = true;
            this.errMessage = "Invalid from and to date. To date should be greater than from date";
            return false;
        }
        return true;
    }

}
@Component({
  selector: 'app-request',
    templateUrl: './addleaverequest.component.html',
})
export class AddLeaveRequestComponent extends LeaveRequestComponent {

  toDatePickerOptions1;
  disableDate = new Date(moment().add(-1, 'days').toDate());
  data;
  holidays: any = [];
  holidaysDate: any = [];


  datePickerOptions = {
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField: false,
    disableWeekends: false,
    disableDays: this.holidays,
    disableUntil: {
      year: this.disableDate.getFullYear(),
      month: this.disableDate.getMonth() + 1,
      day: this.disableDate.getDate()
    }
  };


  ngOnInit(): void {
    this.screen_name = "Add ";
    this.saveDetail = {leave_type: '', reason: '', from_date: '', todate: '', number_of_days: ''};
    this.storedDetail = this.localStorage.getObject('storedDetails');
    this.types = ["half-day", "full-day"];
    this.getholiday();
  }

  onChange(e) {
    if (e == 'full-day') {
      this.saveDetail["reason"] = '';
      this.saveDetail["from_date"] = '';
      this.saveDetail["number_of_days"] = '';
    } else {
      this.saveDetail["reason"] = '';
      this.saveDetail["from_date"] = '';
      this.saveDetail["to_date"] = '';
      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField: false,
        disableDays: this.holidays,
        componentDisabled: true,
      }
      this.saveDetail["number_of_days"] = '';

    }

  }


  get_date() {
    var saveDetail = this.saveDetail;
    if (saveDetail.from_date.jsdate && saveDetail.leave_type == "full-day") {
      var today = new Date(this.saveDetail['from_date'].jsdate);
      var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
      var disable_date = {year: yesterday.getFullYear(), month: yesterday.getMonth() + 1, day: yesterday.getDate()};

      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField: false,
        disableUntil: disable_date,
        disableDays: this.holidays,
        componentDisabled: false,
      };
      if (this.saveDetail['to_date'] && saveDetail.leave_type == "full-day") {
        var from_date = new Date(this.saveDetail['from_date'].jsdate);
        var to_date = new Date(this.saveDetail['to_date'].jsdate);
        var count = this.getWeekDayCount(from_date, to_date);
        this.saveDetail["number_of_days"] = count;
      }
    }
    else if (saveDetail.leave_type == "half-day") {
      this.saveDetail["number_of_days"] = 1;
    }
    else {
      this.toDatePickerOptions1 = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField: false,
        disableDays: this.holidays,
        componentDisabled: true,
      }
    }
    return this.toDatePickerOptions1;
  }

  getFormat(res) {
    return res.year + '/' + res.month + '/' + res.day;
  }

  getWeekDayCount(startDate: any, endDate) {
    var dates = [], count = 0, currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    const getDates = this.get_granted_Dates(startDate, endDate);
    for (var i in getDates) {
      if (this.holidaysDate.indexOf(new Date(this.getFormat(getDates[i])).toISOString()) == -1) {
        var dayOfWeek = new Date(this.getFormat(getDates[i])).getDay();
        var isWeekend = (dayOfWeek == 6) || (dayOfWeek == 0);
        if (!isWeekend)
          count++;
      }
    }
    return count;
  }


  getholiday() {
    this.holidaysDate = [];
    let params = {"employee_id": this.storedDetail.employee_id}
    this.leaverequestService.get_leave_holiday(params).then((res) => {
      if (res.status === AppConstants.successStatus) {
        const holiday = res.data.holiday;
        for (const x in holiday) {
          var holiday_date = new Date(holiday[x]['holiday_date']);
          this.holidays.push({
            year: holiday_date.getFullYear(),
            month: holiday_date.getMonth() + 1,
            day: holiday_date.getDate()
          });
          this.holidaysDate.push(holiday_date.toISOString())
        }

        const granted = res.data.granted;
        for (const x in granted) {
          var dates = this.get_granted_Dates(new Date(granted[x]['from_date']), new Date(granted[x]['to_date']));
          for (const y in dates) {
            this.holidays.push(dates[y]);
            this.holidaysDate.push(new Date(this.getFormat(dates[y])).toISOString())
          }
        }

        const initial = res.data.initial;
        for (const x in initial) {
          var dates = this.get_initial_Dates(new Date(initial[x]['from_date']), new Date(initial[x]['to_date']));
          for (const z in dates) {
            this.holidays.push(dates[z]);
            this.holidaysDate.push(new Date(this.getFormat(dates[z])).toISOString())
          }
        }

      }

    });
  }

  get_granted_Dates(startDate: any, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push({year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()});
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };


  get_initial_Dates(startDate: any, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push({year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()});
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };


  save_leave(leaveModal) {
    if (!this.validate()) {
      return false;
    } else if (this.saveDetail["to_date"] == '') {
      var date=this.saveDetail["from_date"]
       this.saveDetail["to_date"] =date;
    }
      this.saveDetail["employee_id"] = this.storedDetail.employee_id;
      this.saveDetail["employee_email"] = this.storedDetail.employee_email;
      this.saveDetail["employee_name"] = this.storedDetail.employee_name;
      this.leaverequestService.insertLeave(this.saveDetail).then((res) => {
           if(res.status == AppConstants.successStatus){
               let success = {success:true,message:"Leave Request Sent Successfully"};
               this.appservice.setter(success);
               this.router.navigate(['/leave-request']);
           }
       }).catch((err) => {
           console.log(err);
       })
   }

}

@Component({
  selector: 'app-request',
    templateUrl: './addleaverequest.component.html',
})

export class EditLeaveRequestComponent extends LeaveRequestComponent  {

  disableDate = new Date(moment().add(-1, 'days').toDate());
  toDatePickerOptions1;
  data;
  holidays=[];
  datePickerOptions ={
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField:false,
    disableWeekends:false,
    disableDays:this.holidays,
    disableUntil: {year: this.disableDate.getFullYear(), month: this.disableDate.getMonth()+1, day:this.disableDate.getDate()}
  };

  ngOnInit(): void {
        this.screen_name = "Edit ";
        this.saveDetail = {leave_type:'',reason:'',from_date:'',todate:'',number_of_days:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.types = ["half-day", "full-day"];
        this.activatedRoute.params.subscribe((params: Params) => {
             this.leave_id = params['leave_id'];
        });
        this.get_details(this.leave_id);
        this.getholiday()
    }

    get_details(leave_id) {
        let leaveId={"leave_id":leave_id};
        this.leaverequestService.get_edit_details(leaveId).then((res)=> {
            if(res.status === AppConstants.successStatus) {
                this.saveDetail = res.data[0];
                var from_date = new Date(moment(res.data[0].from_date,"DD-MM-YYYY").toDate());
                this.saveDetail.from_date = { date: { year: from_date.getFullYear(), month: from_date.getMonth()+1, day: from_date.getDate() }, jsdate: from_date, formatted: res.data[0].from_date }
                var to_date = new Date(moment(res.data[0].to_date,"DD-MM-YYYY").toDate());
                this.saveDetail.to_date = { date: { year: to_date.getFullYear(), month: to_date.getMonth()+1, day: to_date.getDate() }, jsdate: to_date, formatted: res.data[0].to_date }
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    save_leave(leaveModal) {
        if(!this.validate()){
            return false;
        }
        this.saveDetail["employee_id"]=this.storedDetail.employee_id;
        this.leaverequestService.updateleave(this.saveDetail).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Leave Request updated successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/leave-request']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

  get_granted_Dates(startDate:any, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push({year: currentDate.getFullYear(), month: currentDate.getMonth()+1, day: currentDate.getDate()});
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };


  get_initial_Dates(startDate:any, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push({year: currentDate.getFullYear(), month: currentDate.getMonth()+1, day: currentDate.getDate()});
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };



  getholiday(){
    let params={"employee_id":this.storedDetail.employee_id}
    this.leaverequestService.get_leave_holiday(params).then((res) =>{
      if(res.status === AppConstants.successStatus) {
        const holiday = res.data.holiday;
        for(const x in holiday){
          var holiday_date = new Date(holiday[x]['holiday_date']);
          this.holidays.push({year: holiday_date.getFullYear(), month: holiday_date.getMonth()+1, day: holiday_date.getDate()});
        }

        const granted =res.data.granted;
        for(const x in granted){
          var dates = this.get_granted_Dates(new Date(granted[x]['from_date']),new Date(granted[x]['to_date']));
          for (const y in dates){
            this.holidays.push(dates[y]);
          }
        }
      }

    });
  }

  get_date(){
    var saveDetail = this.saveDetail;
    if(saveDetail.from_date){
      if(saveDetail.from_date.jsdate) {
        var today = new Date(this.saveDetail['from_date'].jsdate);
        var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
        var disable_date = {year: yesterday.getFullYear(), month: yesterday.getMonth() + 1, day: yesterday.getDate()};

        this.toDatePickerOptions1 = {
          dateFormat: 'dd-mm-yyyy',
          inline: false,
          sunHighlight: true,
          satHighlight: true,
          editableDateField: false,
          disableUntil: disable_date,
          disableDays: this.holidays,
          componentDisabled: false,
          disableWeekends: true
        };
        if (this.saveDetail['to_date']) {
          var from_date = new Date(this.saveDetail['from_date'].jsdate);
          var to_date = new Date(this.saveDetail['to_date'].jsdate);
          var diff = to_date.getTime() - from_date.getTime();
          var days = diff / (24 * 60 * 60 * 1000)
          this.saveDetail['number_of_days'] = days + 1;
        }
      }
    }
    else{
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

}

