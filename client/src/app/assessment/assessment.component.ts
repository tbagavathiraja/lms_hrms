import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AssessmentService} from "../assessment/assessment.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppConstants, ErrorConstants} from "../app.constant";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  successMsg=true;
  errMessage = "";
  error={};
  assessmentState="";
  assessmentDetail={};
  employeeDetail={};
    isLoading:boolean;
  ratingsArray:Array<Object> = [
    {rating: 0},
    {rating: 1},
    {rating: 2},
    {rating: 3},
    {rating: 4},
    {rating: 5},
    {rating: 6},
    {rating: 7},
    {rating: 8},
    {rating: 9},
    {rating: 10}

  ];
  private storedDetail;
  constructor(
    private route :ActivatedRoute,
    private router :Router,
    private appComponent:AppComponent,
    private activatedRoute: ActivatedRoute,
    public localStorage: CoolLocalStorage,
    private assessmentService:AssessmentService
  ){
    console.log(this.appComponent);
    this.appComponent.showIncludes=true;
  }

  ngOnInit() {
    this.errMessage = "";
    this.successMsg=false;
    this.storedDetail=this.localStorage.getObject('storedDetails');
      this.isLoading = true;
    this.assessmentCall();

  }

  assessmentCall(){
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = {"id":params['id']};
      this.assessmentState=params['state']
      this.assessmentService.getAssessment(id).then(
          (response) => {
            console.log(response);
            if (response.status === AppConstants.successStatus) {
              this.assessmentDetail = response.data.assessment_details;
              this.employeeDetail = response.data.employee_details;
                this.isLoading = false;
            }
            else {
                this.isLoading = false;
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
    });
  }

  grandSum():number{
  var total=0;
      for (var keyB in this.assessmentDetail) {
        total+=this.assessmentDetail[keyB].parameter_weightage;
      }
     return total;
  }
  overallAppraiseeAverage():number{
  var appraiseeAverage=0;
    for (var keyB in this.assessmentDetail) {
      var calc=(this.assessmentDetail[keyB].appraisee_rating * this.assessmentDetail[keyB].parameter_weightage)/100;
      appraiseeAverage+=calc;
    }
    return appraiseeAverage;
  }
  overallAppraiserAverage():number{
    var appraiserAverage=0;
    for (var keyB in this.assessmentDetail) {
      var calc=(this.assessmentDetail[keyB].appraiser_rating * this.assessmentDetail[keyB].parameter_weightage)/100;
      appraiserAverage+=calc;
    }
    return appraiserAverage;
  }

  saveAssessment(submit):void{

      let data={
        'assessmentDetail':this.assessmentDetail,
        'employeeDetail' :this.employeeDetail
      };
    this.isLoading = true;
    this.assessmentService.saveAssessment(data)
      .then(
        (response) => {
          if (response.status === AppConstants.successStatus) {
            if(!submit){
              this.successMsg=true;
                this.isLoading = false;
              setTimeout(() => {
                this.successMsg=false;
              }, 5000);
            }else{
              if(this.localStorage.getItem('reportingTo') && (this.localStorage.getItem('reportingTo') == this.storedDetail.employee_id)){
                data.employeeDetail['assesmentStatus']='ASSESSED';
              }
              this.submitAssessment(data.employeeDetail);
            }
          }
          else {
            this.isLoading = false;
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
  submitAssessment(data):void{
      console.log(data)
    this.assessmentService.submitAssessment(data)
      .then(
        (response) =>{
          if(response.status === AppConstants.successStatus){
              this.successMsg=true;
                this.isLoading = false;
              setTimeout(() => {
                this.successMsg=false;
              }, 5000);
            this.assessmentCall();
          }
          else{
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
        this.errMessage=error.json().message;
      }

    });
  }
}

  @Component({
    selector: 'map-assessment',
    templateUrl: './map_reporting_manager.component.html',
    styleUrls: ['./assessment.component.css']
  })

  export class mapEmployeeWithReportingManagerComponent implements OnInit {

   successMsg = true;
  errMessage = "";
  error = {};
  assessmentState = "";
  reportingManagersDetail = [];
  employeeDetail = [];
  assignReportingManager=[];
  mappingReportingManager={};
  hideDataView = true;


  private storedDetail;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appComponent: AppComponent,
              private activatedRoute: ActivatedRoute,
              public localStorage: CoolLocalStorage,
              private assessmentService: AssessmentService) {
                  this.appComponent.showIncludes = true;
                }

  ngOnInit() {
    this.errMessage = "";
    this.successMsg = false;
    this.storedDetail = this.localStorage.getObject('storedDetails');
    this.getEmployees(this.storedDetail);
  }


    saveReportingManager(){
      let self = this;
      let localSessionData = this.storedDetail;
      let tempReportingManager=[];
      let tempPrevReportingManager=[];
      this.reportingManagersDetail.forEach(function(value,key){
        if(self.mappingReportingManager[value.employee_email]){
          tempReportingManager.push(value.employee_email);
        }
        if(value.reporting_employee_id===true){
          tempPrevReportingManager.push(value.employee_email);
        }
      });



      if(tempReportingManager.length===0){
        this.errMessage = "Please select atleast one Reporting Manager";
        setTimeout(() => {
          this.errMessage = "";
        },3000);
        return;
      }

      let diff1;let diff2;
      diff1= tempReportingManager.filter(function(x) {
        return tempPrevReportingManager.indexOf(x) < 0 });
      diff2= tempPrevReportingManager.filter(function(x) {
        return tempReportingManager.indexOf(x) < 0 });



      if((tempReportingManager.length > 0 && diff1.length == 0) && (tempPrevReportingManager.length >0 && diff2.length == 0)){
        this.errMessage = "No Changes Made";
        setTimeout(() => {
          this.errMessage = "";
        },3000);
        return;
      }

      let obj = {tenant_id:localSessionData.tenant_id,
                  employee:this.assignReportingManager,
                  reporting_managers:diff1,
                  reporting_managers_prev:diff2,
                };
      this.assessmentService.saveReportingManagers(obj)
        .then(
          (response) => {
            if (response.status === AppConstants.successStatus) {
              this.successMsg = response.message;
              setTimeout(() => {1
                this.successMsg=false;
              },3000);
              this.assignReportingManager=[];
              this.hideDataView=false;

            }
            else {
              this.errMessage = response.message;
            }
          }).catch((error) => {

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

    updateCheckedValue(value,event){
      this.mappingReportingManager[value]=event.target.checked;
     }

    resetDataView(){
      this.hideDataView=false;
    }

    resetManagers(){
      let localSessionData = this.storedDetail;
      let obj = {
        tenant_id: localSessionData.tenant_id,
        employee: this.assignReportingManager["employee_id"],
      }
      this.assessmentService.resetManagers(obj).then((response) => {
        if (response.status === AppConstants.successStatus) {
         this.getReportingManager();
            }
            else {
              this.errMessage = response.message;
            }

        }).catch((error) => {

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

  getEmployees(localSessionData) {
  let tenantId = localSessionData.tenant_id;
    this.assessmentService.getAllEmployees({tenant:tenantId}).then((response) => {
           if (response.status === AppConstants.successStatus) {
             this.employeeDetail = response.data;
          }
          else {
            this.errMessage = response.message;
          }
        }).catch((error) => {

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

    getReportingManager() {
      let localSessionData = this.storedDetail;
      let obj = {tenant_id:localSessionData.tenant_id,
                  email:this.assignReportingManager["employee_email"],
                  role_name:this.assignReportingManager["role_name"]
      };
      let self = this;
      this.assessmentService.getReportingManagers(obj)
        .then(
          (response) => {
            if (response.status === AppConstants.successStatus) {
              this.hideDataView=true;
              this.reportingManagersDetail = response.data;

              this.reportingManagersDetail.forEach(function(value,key){

                if(value.reporting_employee_id == null ){
                  value.reporting_employee_id = false;
                }else{
                  value.reporting_employee_id = true;
                }
                self.mappingReportingManager[value.employee_email] = value.reporting_employee_id;
              });
            }
            else {
              this.errMessage = response.message;
              setTimeout(()=>{
                this.errMessage = "";
              },10000);
            }
          }).catch((error) => {

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

}

