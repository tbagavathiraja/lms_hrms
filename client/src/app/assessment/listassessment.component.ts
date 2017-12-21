import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AssessmentService} from "../assessment/assessment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import { DataTableResource } from 'angular-4-data-table';
@Component({
  selector: 'app-list-assessment',
  templateUrl: './listassessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class ListAssessmentComponent implements OnInit {
    successMsg=true;
    errMessage = "";
    error={};
    employeeCollection="";
    assessmentDetail={};
    employeeDetail={};
    public assessmentListData;
    itemCount = 0;
    items = [];
    delete_id;
    isLoading:boolean;
    success:boolean;
    success_message:string;
    search;

  private storedDetail;
  constructor(
    private route :ActivatedRoute,
    private router :Router,
    private appComponent:AppComponent,
    private activatedRoute: ActivatedRoute,
    public localStorage: CoolLocalStorage,
    private assessmentService:AssessmentService,
    protected appservice:AppService
  ){
        this.appComponent.showIncludes=true;
  }

  reloadItems(parameter) {
    if(this.assessmentListData){
       this.assessmentListData.query(parameter).then(items => this.items = items);
    }
  }

  assessmentList() {
    this.isLoading = true;
      let getall={"search":this.search};
    this.assessmentService.getAssessmentList(getall)
      .then((assessmentListData) => {
        if(assessmentListData.message == 'No records found') {
          this.isLoading = false;
          this.itemCount = 0;
        } else{
          if (assessmentListData.status === AppConstants.successStatus) {
            this.itemCount = 0;
            this.assessmentListData = new DataTableResource(assessmentListData.data);
            this.itemCount = assessmentListData.data.length;
           }

        }
      }).catch(function(err){
      console.log(err);
    })
  }

  ngOnInit() {
    this.errMessage = "";
    this.successMsg=false;
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.assessmentList();
    this.employeeList(this.storedDetail);
    let success_msg = this.appservice.getter();
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

  employeeList(data){
    let tenant={
      'id':data.tenant_id
    }
      this.isLoading = true;
    this.assessmentService.getEmployees(tenant)
      .then(
        (response) => {
            this.isLoading = false;
          if (response.status === AppConstants.successStatus) {
            this.employeeCollection=response.data;
          }
          else {
            this.errMessage=response.message;
          }
        }).catch((error) => {
        this.isLoading = false;
        if (error.json().code == null) {
          this.error = {
            message: error.statusText,
            status: error.status
          };
        } else {
          this.error = {};
          this.errMessage = error.message;
        }

      });
  }

    delete_asessment(id,deleteModal) {
        this.delete_id = id;
        deleteModal.open();
    }
    delete_confirm(deleteModal):void{
        let delteParam = {"delete_id":this.delete_id};
        this.isLoading = true;
        this.assessmentService.delete_assessment(delteParam)
        .then((response) => {
          if(response.message == 'No records found') {
            this.isLoading = false;
            this.itemCount = 0;
          } else {
            if (response.status === AppConstants.successStatus) {
              this.isLoading = false;
              this.assessmentList();
              this.success = true;
              deleteModal.close();
              this.success_message = 'Assessment Deleted Successfully'
            }
          }
        });
}

   updateCheckedOptions(option, event) {
    let data=this.employeeCollection[option];
    data["checked"]= event.target.checked;

  }



}
