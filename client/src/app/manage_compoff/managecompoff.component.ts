import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ManageCompoffService} from "./managecompoff.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './managecompoff.component.html',
})
export class ManageCompoffComponent implements OnInit {

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
    compoffs;
    searchDetail;
    leaveStatus=[];
    dropvals={};
    basedOn;
  saveReason={};
  rejectCompoffId;
  acceptCompoffId;
  rejectedreason;


  constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
         protected manageCompoffService:ManageCompoffService,
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
      this.getAllcompoff();
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
    this.compoffs.query(params).then(items => this.items = items);
  }


  getAllcompoff(){
    let tenant = {"search":this.search,"employee_id":this.storedDetail.employee_id};
    this.isLoading = true;
    this.manageCompoffService.getcompoff(tenant).then( (res)=> {
         console.log(res)
      if(res.message == 'No records found') {
        this.isLoading = false;
        this.showrecords=true;
        this.success_message="No Records Found";
        this.itemCount = 0;
      }else{
        if(res.status == AppConstants.successStatus) {
          this.isLoading = false;
          this.compoffs = res.data;
          this.compoffs = new DataTableResource(res.data);
          this.itemCount = res.data.length;
        }
      }
    }).catch(function(err){
      console.log(err);
    })
  }

  accept(compoff_details,modal){
    this.acceptCompoffId=compoff_details;
    modal.open()
  }


  accept_compoff(acceptModal){
      this.isLoading = true;
      let acceptParam = {"compoff_id": this.acceptCompoffId["compoff_id"],"responded_by": this.storedDetail.employee_id,"employee_email":this.acceptCompoffId["employee_email"]};
        this.manageCompoffService.acceptcompoff(acceptParam)
        .then(
          (res) => {
            if (res.status === AppConstants.successStatus) {
              this.isLoading = false;
              acceptModal.close();
              this.getAllcompoff();
              this.success = true;
              this.success_message = 'Your Reponse Was Recorded'
            }
          });

  }

  reject(compoff_Id,modal){
    this.rejectCompoffId= compoff_Id;
    this.saveReason={};
    modal.open();
  }




  reject_compoff(rejectModal){
    if(!this.saveReason['rejected_reason'] || this.saveReason['rejected_reason'] ==''){
      this.error_status=true;
      this.errMessage="Enter Rejected Reason"
    }else if(this.saveReason['rejected_reason'] !== ""){
      let rejectParam = {"rejected_reason": this.saveReason['rejected_reason'],"compoff_id":this.rejectCompoffId["compoff_id"],"responded_by":this.storedDetail.employee_id,"employee_email":this.rejectCompoffId["employee_email"]};
      this.isLoading = true;
      this.manageCompoffService.rejectcompoff(rejectParam).then(
          (res) =>{
            if(res.status === AppConstants.successStatus){
              this.isLoading = false;
              rejectModal.close();
              this.success=true;
              this.success_message='Your Reponse Was Recorded'
              this.getAllcompoff();
              this.saveReason={}
            }

          });
    }
  }

}


