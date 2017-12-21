import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AssessmentService} from "../assessment/assessment.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";

@Component({
  selector: 'app-assessment',
  templateUrl: './addassessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {
    successMsg=true;
    errMessage = "";
    error={};
    employeeCollection="";
    assessmentDetail={};
    employeeDetail={};
    screen_name:string;
    assessment_period=[1,2,3,4,5];
    employeeList;
    isEmployee:boolean;
    isSelectedAll:boolean;
    error_status:boolean;
    isLoading:boolean;
    addAssessment={selectedValue:"",employees:[]}

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
      this.screen_name = "Add";
      this.isSelectedAll = false;
      this.error_status=false;
      this.isEmployee = false;
  }

  ngOnInit() {
    this.errMessage = "";
    this.successMsg=false;
    this.screen_name = "Add";
      this.getAssessmentList();

  }
    getAssessmentList():void{
        this.isLoading = true;
         this.assessmentService.getAssessmentPeriod()
        .then(
          (response) =>{
              this.isLoading = false;
            if(response.status === AppConstants.successStatus){
              this.assessment_period = response.data;
                //this.addAssessment.selectedValue = response.data[0].period_id;
                this.getAssessmentEmployee();
            }
          }).catch((error)=>{
              this.isLoading = false;
        });
    }

    getAssessmentEmployee():void{
        this.isLoading = true;
        let getParam = {assessment_id:this.addAssessment.selectedValue}
         this.assessmentService.getAssessmentEmployee(getParam)
        .then(
          (response) =>{
              this.isLoading = false;
            if(response.status === AppConstants.successStatus){
                this.employeeList = response.data;
                if(this.addAssessment.selectedValue == ""){
                    this.isEmployee = false;
                }else{
                    if(this.employeeList.length>0){
                        this.isEmployee = true;
                    }
                }

            }
          }).catch((error)=>{
        });
    }

    save_assessment():void{

        this.error_status = false;;
        if(this.addAssessment.selectedValue == ""){
            this.error_status = true;
            this.errMessage = "Please select assessment period";
            return;
        }else if(this.addAssessment.employees.length == 0){
            this.error_status = true;
            this.errMessage = "Select atleast one employee";
            return;
        }
      this.isLoading = true;
         this.assessmentService.saveAssessmentEmployee(this.addAssessment)
        .then(
          (response) =>{
              this.isLoading = false;
            if(response.status === AppConstants.successStatus){
                let success = {success:true,message:"Assessment Added Successfully"};
                this.appservice.setter(success);
              this.router.navigate(['/list-assessment']);
            }
          }).catch((error)=>{
           this.isLoading = false;
        });
    }

    addEmployee(id):void{
        let index = this.addAssessment.employees.indexOf(id);
        if(index > -1){
            this.addAssessment.employees.splice(index,1);
        }else{
            this.addAssessment.employees.push(id);
        }
        if(this.addAssessment.employees.length == this.employeeList.length){
            this.isSelectedAll = true;
        }else{
            this.isSelectedAll = false;
        }

    }

    selectAll():void{
        if(this.isSelectedAll){
            this.isSelectedAll = false;
            for (let entry of this.employeeList) {
                if(this.addAssessment.employees.indexOf(entry.employee_id) > -1){
                    let index = this.addAssessment.employees.indexOf(entry.employee_id);
                    this.addAssessment.employees.splice(index,1);
                }
            }
        }else{
            this.isSelectedAll = true;
            for (let entry of this.employeeList) {
                if(this.addAssessment.employees.indexOf(entry.employee_id) <= -1){
                    this.addAssessment.employees.push(entry.employee_id);
                }
            }
        }
        console.log(this.addAssessment.employees);

    }
    isChecked(id):boolean{
        if(this.addAssessment.employees.indexOf(id) > -1){
            return true;
        }
        return false;
    }


  updateCheckedOptions(option, event) {
    let data=this.employeeCollection[option];
    data["checked"]= event.target.checked;

  }



}
