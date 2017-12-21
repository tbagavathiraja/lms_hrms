import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import { SummaryService } from "./summary.service";
import { AppConstants, ErrorConstants } from "../app.constant";
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  selfSummary=[];
  employeeSummary;
  errMessage = "";
  error={};
    isLoading:boolean;
  private storedDetail;
  itemCount = 0;
  items = [];
  constructor(
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    private summaryService:SummaryService
  ){
    this.appComponent.showIncludes=true;
  }

  ngOnInit() {
    this.errMessage = "";
      this.isLoading = true;
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.summaryService.getSelfSummary(this.storedDetail)
        .then(
          (response) =>{
            if(response.status === AppConstants.successStatus){
              this.selfSummary = response.data;
                this.isLoading = false;
            }
            else{
              this.isLoading = false;
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

    this.summaryService.getEmployeesSummary(this.storedDetail)
      .then(
        (response) =>{
          if(response.status === AppConstants.successStatus){
            this.employeeSummary = new DataTableResource(response.data);
            this.itemCount = response.data.length;
          }
          else{
            this.errMessage=response.message;
            this.isLoading = false;
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
    this.employeeSummary.query(params).then(items => this.items = items);
  }
  setRole(data):void{
    if(data.reporting_employee_id){
      this.localStorage.setItem('reportingTo', data.reporting_employee_id);
    }
  }
}


