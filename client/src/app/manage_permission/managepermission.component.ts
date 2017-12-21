import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ManagePermissionService} from "./managepermission.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './managepermission.component.html',
})
export class ManagePermissionComponent implements OnInit {

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
    search;
    saveDetail;
    permissions;
    searchDetail;
    leaveStatus=[];
    dropvals={};
    basedOn;
    saveReason={};
  accept_date=[];
  reject_date=[];
    rejectPermissionId;
    acceptPermissionId;


  constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
         protected managePermissionService:ManagePermissionService,
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
        this.getAllpermission();
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

  reloadItems(params) {
    this.permissions.query(params).then(items => this.items = items);
  }


  getAllpermission(){
    let tenant = {"search":this.search,"employee_id":this.storedDetail.employee_id};
    this.isLoading = true;
    this.managePermissionService.getpermission(tenant).then( (res)=> {
      console.log(res)
       if(res.message == 'No records found') {
         this.isLoading = false;
        this.showrecords=true;
        this.success_message="No Records Found";
        this.itemCount = 0;
      }else {
        if(res.status == AppConstants.successStatus) {
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

  accept(permission_details,modal){
    this.acceptPermissionId=permission_details;
    var dates=this.acceptPermissionId["date"]
    var from = moment(new Date(dates)).format("DD-MM-YYYY")

    this.accept_date["date"]=from;
    modal.open()
  }


  accept_permission(acceptModal){
      this.isLoading = true;
      let acceptParam = {"permission_id":this.acceptPermissionId["permission_id"],"responded_by": this.storedDetail.employee_id,"employee_email":this.acceptPermissionId["employee_email"],"date":this.accept_date["date"]};
       this.managePermissionService.acceptpermission(acceptParam).then(
          (res) =>{
            if(res.status === AppConstants.successStatus){
              this.isLoading = false;
              this.getAllpermission();
              acceptModal.close();
              this.success=true;
              this.success_message='Your Reponse Was Recorded'
            }
          });

  }

  reject(permission_Id,modal){
    this.rejectPermissionId=permission_Id;
    var dates=this.rejectPermissionId["date"]
    var from = moment(new Date(dates)).format("DD-MM-YYYY")

    this.reject_date["date"]=from;
      this.saveReason={};
    modal.open();
  }




  reject_permission(rejectModal){
    if(!this.saveReason['rejected_reason'] || this.saveReason['rejected_reason']== ''){
      this.error_status=true;
      this.errMessage="Enter Rejected Reason"
    }else if(this.saveReason['rejected_reason'] !== ""){
      let rejectParam = {"rejected_reason": this.saveReason['rejected_reason'],"permission_id":this.rejectPermissionId["permission_id"],"responded_by":this.storedDetail.employee_id,"employee_email":this.rejectPermissionId["employee_email"],"date":this.reject_date["date"]};
      this.isLoading = true;
       this.managePermissionService.rejectpermission(rejectParam).then(
          (res) =>{
            if(res.status === AppConstants.successStatus){
              this.isLoading = false;
              rejectModal.close();
              this.success=true;
              this.success_message='Your Reponse Was Recorded'
              this.getAllpermission();
              this.saveReason={}

            }

          });
    }
  }

}


