import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ReminderService} from "./reminder.service";
import {AppConstants, ErrorConstants} from "../app.constant";
import { AppService } from "../app.service"
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-reminder',
    templateUrl: './reminder.component.html',
})
export class ReminderComponent implements OnInit {
  reminderCollection;
  itemCount = 0;
  items = [];
  errMessage = "";
  error={};
    isLoading:boolean;
    releaseResourceEmployeeId= "";
  success;
    search;
  success_message;
  private storedDetail;
  constructor(
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    private reminderService:ReminderService,
    protected appService:AppService
  ){
    console.log(this.appComponent);
    this.appComponent.showIncludes=true;
  }


  getReminderSummary(){
       let getAll = this.storedDetail;
      getAll.search = this.search;
      this.isLoading = true;
    this.reminderService.getReminderSummary(getAll)
      .then(
        (response) =>{
            this.isLoading = false;
          if(response.status === AppConstants.successStatus){
            this.reminderCollection = new DataTableResource(response.data);
            this.itemCount = response.data.length;
            console.log(response.data);
          }
          else{
            this.reminderCollection = [];
              this.itemCount = 0;
            this.errMessage=response.message;
          }
        }).catch((error)=>{
        this.isLoading = false;
      if(error.json().code==null){
        this.error={
          message:error.statusText,
          status:error.status
        };
      }else{
        this.error={};
        this.errMessage=error.message;
      }

    });
  }

  reloadItems(params) {
    this.reminderCollection.query(params).then(items => this.items = items);
  }

  releaseResource(releaseModal,resource_request_id){
    this.releaseResourceEmployeeId = resource_request_id;
    releaseModal.open();
  }


  confirmRelease(releaseModal){
    this.reminderService.releaseResource(this.releaseResourceEmployeeId,this.storedDetail)
      .then(
        (response) =>{
          if(response.status === AppConstants.successStatus){
            this.success = true;
            this.success_message="Resource released Successfully";
            console.log(response);
              this.search = '';
            this.getReminderSummary();
            releaseModal.close();
          }
          else{
            releaseModal.close();
            this.errMessage=response.message;
          }
        }).catch((error)=>{

      if(error.json().code==null){
        this.error={
          message:error.statusText,
          status:error.status
        };
      }else{
        this.error={};
        this.errMessage=error.message;
      }

    });
  }
    ngOnInit(): void {
      this.errMessage = "";
      this.storedDetail=this.localStorage.getObject('storedDetails');
      this.getReminderSummary();

    }
}




