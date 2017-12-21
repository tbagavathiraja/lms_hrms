import { Component, ViewContainerRef, OnInit } from '@angular/core';
import {AssessmentParameterService} from './assessmentparameter.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppService} from "../app.service";
import {AppComponent} from "../app.component";

import { AppConstants,ErrorConstants} from '../app.constant';
import { Observable } from 'rxjs/Observable';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-request',
    templateUrl: './assessmentparameter.component.html',
})
export class AssessmentParameterComponent implements OnInit {
    errMessage = "";
    error={};
    error_status:boolean;
    assessmentParameterdata;
    itemCount = 0;
    items = [];
    success:boolean;
    parameter_id:number;
    success_message="";
    delete_id:string;
    screen_name:string;
    parameterModel;
    search;
    isLoading:boolean;

    constructor(
        protected AssessmentParameterService:AssessmentParameterService,
        vcRef: ViewContainerRef,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService,
        private appComponent:AppComponent,
        ) {

        this.appComponent.showIncludes=true;
    }

  ngOnInit(): void {
    this.errMessage = "";
    this.success = false;
    this.get_all_parameter();
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

    delete_parameter(id,deleteModal) {
        this.delete_id = id;
        deleteModal.open();
    }
    delete_confirm(deleteModal):void{
        this.isLoading = true;
        let delteParam = {"delete_id":this.delete_id};

        this.AssessmentParameterService.delete_parameter(delteParam)
        .then((assessmentParameterdata) =>{
            if (assessmentParameterdata.status === AppConstants.successStatus) {
              this.isLoading = false;
              this.get_all_parameter();
              this.success = true;
              deleteModal.close();
              this.success_message = 'Assessment Deleted Successfully'
            }

        });
    }

    reloadItems(params) {
        if(this.assessmentParameterdata.items) {
        this.assessmentParameterdata.query(params).then(items => this.items = items);
      }
    }

    get_all_parameter():void{
        this.isLoading = true;
        let getAll = {"search":this.search};
        this.assessmentParameterdata = this.AssessmentParameterService.getAll(getAll)
        .then(
          (assessmentParameterdata) =>{
            if(assessmentParameterdata.code === 1056) {
              this.isLoading = false;
              this.itemCount = 0;
            } else{
              if(assessmentParameterdata.status === AppConstants.successStatus){
                this.isLoading = false;
                this.itemCount = 0;
                this.assessmentParameterdata = new DataTableResource(assessmentParameterdata.data);
                this.itemCount = assessmentParameterdata.data.length;

              }
              else{
                this.error=assessmentParameterdata;
              }

            }

            this.reloadItems({offset: 0, limit: 15});
            this.isLoading = false;

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

    get_parameter_detail():void{
        this.isLoading = true;
        this.assessmentParameterdata = this.AssessmentParameterService.getDetail(this.parameter_id)
        .then(
          (assessmentParameterdata) =>{
              this.isLoading = false;
            if(assessmentParameterdata.status === AppConstants.successStatus){
              this.parameterModel = assessmentParameterdata.data[0];
            }
            else{
              this.error=assessmentParameterdata;
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

    validate():boolean{
        if(!this.parameterModel.parameter_name || this.parameterModel.parameter_name == ""){
            this.error_status = true;
            this.errMessage = "Please enter parameter name";
            return false;
        }else if(this.parameterModel.parameter_name.length>20){
            this.error_status = true;
            this.errMessage = "Parameter name maximum length should be 20";
            return false;
        }else if(!this.parameterModel.default_parameter_weightage || this.parameterModel.default_parameter_weightage == ""){
            this.errMessage = "Please enter parameter weightage";
            this.error_status = true;
            return false;
        }else if(isNaN(this.parameterModel.default_parameter_weightage)){
            this.errMessage = "Please enter valid parameter weightage";
            this.error_status = true;
            return false;
        }else if(this.parameterModel.default_parameter_weightage<=0){
            this.errMessage = "Parameter weightage minimum value should be 1";
            this.error_status = true;
            return false;
        }else if(this.parameterModel.default_parameter_weightage>20){
            this.errMessage = "Parameter weightage maximum value should be 20";
            this.error_status = true;
            return false;
        }
        this.error_status = false;
        return true;
    }
    onChange(value):void{
        this.parameterModel.apraisal_parameter_type = value;
    }

}
@Component({
  selector: 'app-request',
    templateUrl: './addassessmentparameter.component.html',
})
export class AddAssessmentParameterComponent extends AssessmentParameterComponent {

    ngOnInit(): void {
        this.screen_name = "Add ";
        this.parameterModel = {parameter_name:"",default_parameter_weightage:"",apraisal_parameter_type:"GENERAL"};
    }
    save_parameter():void{

        let validated = this.validate();
        if(validated){
          this.isLoading = true;
             this.assessmentParameterdata = this.AssessmentParameterService.insertParameter(this.parameterModel)
        .then(
          (assessmentParameterdata) =>{
              this.isLoading = false;
            if(assessmentParameterdata.status === AppConstants.successStatus){
                let success = {success:true,message:"Assessment Parameter Added Successfully"};
                this.appservice.setter(success);
              this.router.navigate(['/assessment-parameter']);
            }
            else{
                this.error_status = true;
                this.errMessage = assessmentParameterdata.message;
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
    }
}

@Component({
  selector: 'app-request',
    templateUrl: './addassessmentparameter.component.html',
})
export class EditAssessmentParameterComponent extends AssessmentParameterComponent {
    ngOnInit(): void {
        this.screen_name = "Edit ";
        this.activatedRoute.params.subscribe((params: Params) => {
            this.parameter_id = params['parameter_id'];
        });
        //this.parameterModel = {parameter_name:"",default_parameter_weightage:"",apraisal_parameter_type:""};
        this.get_parameter_detail();
    }
    save_parameter():void{

        let validated = this.validate();
        if(validated){
            this.isLoading = true;
            this.assessmentParameterdata = this.AssessmentParameterService.updateParameter(this.parameter_id,this.parameterModel)
        .then(
          (assessmentParameterdata) =>{
              this.isLoading = false;
            if(assessmentParameterdata.status === AppConstants.successStatus){
                let success = {success:true,message:"Assessment Parameter Updated Successfully"};
                this.appservice.setter(success);
              this.router.navigate(['/assessment-parameter']);
            }
            else{
              this.error=assessmentParameterdata;
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
    }
}
