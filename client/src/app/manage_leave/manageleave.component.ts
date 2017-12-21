import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ManageLeaveService} from "./manageleave.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './manageleave.component.html',
})
export class ManageLeaveComponent implements OnInit {

   errMessage = "";
   showrecords:boolean;
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
  showleaveType:boolean;
  saveDetail;
    leaves;
    leave_type;
    search;
    leaveStatus=[];
    dropvals={};
    basedOn;
    rejectLeaveId;
    saveReason={};
    acceptReason={};
    acceptLeaveId;
   accept_date=[];
  reject_date=[];
   type;
  error1:boolean;


  constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
         protected manageLeaveService:ManageLeaveService,
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
      this.dropvals = ["Sick Leave", "Casual Leave", "Maternity Leave", "Paternity Leave", "Earned Leave"];
      this.basedOn = {columns: "", value: "", column: ""};
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

  leaveType(type){
    let tenant = {"employee_email":this.acceptLeaveId["employee_email"],"leave_type":type};
     this.manageLeaveService.leave_type(tenant).then( (res)=> {
       if(res.message == 'No records found') {
          this.success_message="No Type Found";
       }else {
        if(res.status == AppConstants.successStatus) {
          this.showleaveType=true
           this.leave_type=res.data[0]['COUNT'];
          this.type=type;
          }
      }
    }).catch(function(err){
      console.log(err);
    })
  }


  reloadItems(params) {
    this.leaves.query(params).then(items => this.items = items);
  }

  getAllleave(){
    let tenant = {"search":this.search,"employee_id":this.storedDetail.employee_id};
     this.isLoading = true;
    this.manageLeaveService.getleaves(tenant).then( (res)=> {
          if(res.message == 'No records found') {
        this.isLoading = false;
        this.showrecords=true;
        this.success_message="No Records Found";
        this.itemCount = 0;
      }else {
        if(res.status == AppConstants.successStatus) {
          this.isLoading = false;
          this.leaves = res.data;
           this.leaves = new DataTableResource(res.data);
          this.itemCount = res.data.length;
        }
      }
    }).catch(function(err){
      console.log(err);
    })
  }



  accept(leave_details,modal){
    this.acceptLeaveId=leave_details;
    var from_dates=this.acceptLeaveId["from_date"]
    var to_dates=this.acceptLeaveId["to_date"]

    var from = moment(new Date(from_dates)).format("DD-MM-YYYY")
    var to = moment(new Date(to_dates)).format("DD-MM-YYYY")

    this.accept_date["from_date"]=from;
    this.accept_date["to_date"]=to;
    modal.open()
  }


  accept_leave(status,acceptModal){
    if(!status || status == ''){
      this.error_status=true;
      this.errMessage="Please Select Leave Type"
    }else if(status != ""){
      this.error_status = false;
      this.errMessage = "";
      this.isLoading = true;
      let acceptParam = {"leave_id":this.acceptLeaveId["leave_id"],"status": status,"responded_by": this.storedDetail.employee_id,"employee_email":this.acceptLeaveId["employee_email"],"from_date":this.accept_date["from_date"],"to_date":this.accept_date["to_date"]};
       this.manageLeaveService.acceptleave(acceptParam)
        .then((res) =>{
            if(res.status === AppConstants.successStatus){
              this.isLoading = false;
              this.getAllleave();
              acceptModal.close();
              this.success=true;
              this.success_message='Your Reponse Was Recorded';
            }
          });
    }
  }

  reject(leave_Id,modal){
    this.rejectLeaveId= leave_Id;
     this.saveReason={};
    var from_dates=this.rejectLeaveId["from_date"];
    var to_dates=this.rejectLeaveId["to_date"];

    var from = moment(new Date(from_dates)).format("DD-MM-YYYY");
    var to = moment(new Date(to_dates)).format("DD-MM-YYYY");

    this.reject_date["from_date"]=from;
    this.reject_date["to_date"]=to;
    modal.open();
  }

  reject_leave(rejectModal){
    if(!this.saveReason['rejected_reason'] || this.saveReason['rejected_reason'] == ''){
      this.error_status=true;
      this.errMessage="Enter Rejected Reason"
    }else if(this.saveReason['rejected_reason'] !== ""){
      let rejectParam = {"rejected_reason":this.saveReason['rejected_reason'],"leave_id":this.rejectLeaveId["leave_id"],"responded_by":this.storedDetail.employee_id,"employee_mail":this.rejectLeaveId["employee_email"],"leave_type":this.rejectLeaveId["leave_type"],"from_date":this.reject_date["from_date"],"to_date":this.reject_date["to_date"]};
      this.isLoading = true;
       this.manageLeaveService.rejectleave(rejectParam).then(
          (res) =>{
            if(res.status === AppConstants.successStatus){
              this.isLoading = false;
              rejectModal.close();
              this.success=true;
              this.success_message='Your Reponse Was Recorded'
              this.getAllleave();
              this.saveReason={};
            }

          });
    }
  }

}


