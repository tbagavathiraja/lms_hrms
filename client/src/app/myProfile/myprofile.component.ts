import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {MyProfileService} from "./myprofile.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-summary',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyProfileComponent implements OnInit {

    myProfileSummary;
    errMessage = "";
    success:boolean;
    success_message:string;
    error={};
    delete_id:number;
    private storedDetail;
    screen_name;
    employeeModel;
    employee_id;
    isLoading:boolean;
	  employee_email;
    itemCount = 0;
    items = [];
    error_status:boolean;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        editableDateField:false,
      };
    d  = new Date();
    selDate: IMyDate = {year: this.d.getFullYear(), month: this.d.getMonth(), day: this.d.getDate()};
	roles = [];
    updateEmployee:boolean = false;
    datePickerOptions = {
      dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
    };
    constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
        protected myProfileService:MyProfileService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService
    ){
        this.appComponent.showIncludes=true;

    }

  ngOnInit() {
    this.screen_name="My";
    this.errMessage = "";
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.get_myProfile()
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



    get_myProfile():void{
      let getdetails={"employee_id":this.storedDetail.employee_id};
       this.myProfileService.getProfileSummary(getdetails).then((res) =>{
            console.log(res.data)
            if(res.status === AppConstants.successStatus){
             this.myProfileSummary=res.data;
             console.log(this.myProfileSummary);
             }
            else{
              this.error=res;
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
    get_employee_detail():void{
        this.isLoading = true;
        this.myProfileService.getDetail(this.employee_email)
        .then((employeedata) =>{
              this.isLoading = false;
              console.log(employeedata)
            if(employeedata.status === AppConstants.successStatus){
             this.employeeModel = employeedata.data[0];
              this.employeeModel.date_of_joining = {formatted:this.employeeModel.date_of_joining}
            }
            else{
              this.error=employeedata;
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


  getRoles(tenant_id):any{
    this.myProfileService.getRoles({tenant_id:tenant_id}).
    then((response)=>{
      this.roles = response.data;
    }). catch((error)=>{
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

@Component({
  selector: 'app-request',
    templateUrl: './editmyprofile.component.html',
})
export class EditMyProfileComponent extends MyProfileComponent {

  ngOnInit(): void {
        this.screen_name = "Edit ";
        this.updateEmployee = true;
        this.activatedRoute.params.subscribe((params: Params) => {
			 this.employee_email = params['employee_email'];
        });
		   this.getRoles(1);
        this.get_employee_detail();
    }


  validate():boolean{
      if(this.employeeModel.employee_password != this.employeeModel.employee_confirm_password){
      this.errMessage = "Password and confirm password should be same";
      this.error_status = true;
      return false;
    }
    if(this.employeeModel.employee_password && this.employeeModel.employee_password != ""){
      if(this.employeeModel.employee_password.length<5){
        this.errMessage = "Password minimum length should be 5";
        this.error_status = true;
        return false;
      }else if(this.employeeModel.employee_password.length>15){
        this.errMessage = "Password maximum length should be 15";
        this.error_status = true;
        return false;
      }
    }
    this.error_status = false;
    return true;
  }

    save_employee():void {
    console.log(this.employeeModel);
      let validated = this.validate();
      if (validated) {
        this.isLoading = true;
        this.myProfileService.updateEmployee(this.employeeModel)
          .then(
            (employeedata) => {
              this.isLoading = false;
              if (employeedata.status === AppConstants.successStatus) {
                let success = {success: true, message: "Profile Details Updated Successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/MyProfile']);
              }
              else {
                this.error = employeedata;
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
    }
}

