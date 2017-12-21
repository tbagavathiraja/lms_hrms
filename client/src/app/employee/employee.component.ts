import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {EmployeeService} from "./employee.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import { AdminHolidayService } from "../admin_holiday/adminholiday.service";
@Component({
  selector: 'emp-summary',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
    selfSummary = [];
    employeeSummary;
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
    search;
  locations: any;
  departments:any;
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
        // public modal:Modal,
        protected employeeService:EmployeeService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService,
        public adminholidayService:AdminHolidayService
    ){
        this.appComponent.showIncludes=true;

    }

    reloadItems(params) {
        this.employeeSummary.query(params).then(items => this.items = items);
    }

    delete_employee(email,deleteModal) {
        this.delete_id = email;
        deleteModal.open();
    }
    delete_confirm(deleteModal):void{
        let delteParam = {"delete_id":this.delete_id};
        this.isLoading = true;
        this.employeeService.delete_employee(delteParam)
        .then(
          (employeedata) =>{
              this.isLoading = false;
            if(employeedata.status === AppConstants.successStatus){
                this.success = true;
                this.get_all_employee();
                deleteModal.close();
                this.success_message = "Employee Deleted Successfully";
            }
            else{
                this.error = employeedata;
                this.success = false;
                this.success_message = "";
            }
          }).catch((error)=>{
        this.isLoading = false;
          if(error.json().code==null){
            this.error={
              message:error.statusText,
              status:error.status
            };
              this.success = false;
              this.success_message = "";
          }else{
            this.error={};
            this.errMessage=error.message;
              this.success = false;
              this.success_message = "";
          }

        });
    }
    get_all_employee():void{
        this.isLoading = true;
        let getAll = {search:this.search};
        this.employeeSummary = this.employeeService.getEmployeesSummary(getAll)
        .then(
          (employeeSummary) =>{
              this.isLoading = false;
            if(employeeSummary.status === AppConstants.successStatus){
              //this.employeeSummary = employeeSummary.data;
                this.employeeSummary = new DataTableResource(employeeSummary.data);
                this.itemCount = employeeSummary.data.length;
              //console.log(this.assessmentParameterdata);
              //this.assessmentParameterdata = Object.keys(this.assessmentParameterdata);
            }
            else{
              this.error=employeeSummary;
                //this.employeeSummary = [];
                this.itemCount = 0;

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
        let email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let email_validation = email_regex.test(this.employeeModel.employee_email);
        console.log(this.employeeModel);
        if(!this.employeeModel.employee_number || this.employeeModel.employee_number == ""){
            this.error_status = true;
            this.errMessage = "Please enter employee number";
            return false;
        }else if(!this.employeeModel.employee_name || this.employeeModel.employee_name == ""){
            this.errMessage = "Please enter employee name";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.employee_name.length>60){
            this.errMessage = "Employee name maximum length should be 60";
            this.error_status = true;
            return false;
        }else if(!this.employeeModel.employee_email || this.employeeModel.employee_email == ""){
            this.errMessage = "Please enter employee email";
            this.error_status = true;
            return false;
        }else if(!email_validation){
            console.log(email_validation);
            console.log(this.employeeModel.employee_email);
            this.errMessage = "Please enter valid employee email";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.employee_email.length>100){
            this.errMessage = "Employee email maximum length should be 100";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.employee_password == "" || this.employeeModel.employee_confirm_password == ""){
            this.errMessage = "Please enter Password and confirm password";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.employee_password != this.employeeModel.employee_confirm_password){
          this.errMessage = "Password and confirm password should be same";
          this.error_status = true;
          return false;
        }else if(!this.employeeModel.date_of_joining || this.employeeModel.date_of_joining.formatted == ""){
          this.errMessage = "Please select Date of Joining date";
          this.error_status = true;
          return false;
        }else if(!this.employeeModel.designation || this.employeeModel.designation == ""){
            this.errMessage = "Please enter designation";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.designation.length<2){
            this.errMessage = "Designation minimum length should be 2";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.designation.length>25){
            this.errMessage = "Designation maximum length should be 25";
            this.error_status = true;
            return false;
        }else if(!this.employeeModel.role|| this.employeeModel.role == ""){
          this.errMessage = "Please select role";
          this.error_status = true;
          return false;
        }else if(!this.employeeModel.location || this.employeeModel.location == ""){
            this.errMessage = "Please select location";
            this.error_status = true;
            return false;
        }else if(!this.employeeModel.department || this.employeeModel.department == ""){
          this.errMessage = "Please select department";
          this.error_status = true;
          return false;
        }else if(this.employeeModel.location.length<3){
            this.errMessage = "Location minimum length should be 3";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.location.length>30){
            this.errMessage = "Location maximum length should be 30";
            this.error_status = true;
            return false;
        }else if(this.employeeModel.admin_access.length == ""){
            this.errMessage = "Please select admin access";
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
    get_employee_detail():void{
        this.isLoading = true;
        this.employeeService.getDetail(this.employee_email)
        .then(
          (employeedata) =>{
              this.isLoading = false;
            if(employeedata.status === AppConstants.successStatus){
             this.employeeModel = employeedata.data[0];
            // let date = this.employeeModel.date_of_joining.split("-");
            // this.employeeModel.date_of_joining = { date : { year : Number(date[2]), month : Number(date[1]), day : Number(date[0]) } }
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
  ngOnInit() {
    this.errMessage = "";
    this.get_all_employee();
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


  getlocation() {
    this.adminholidayService.getlocation().then((res) => {
      this.locations = res.data;
    }).catch(function (err) {
      console.log(err);
    })
  }
  getdepartments() {
    this.adminholidayService.getdepartment().then((res) => {
      this.departments = res.data;
    }).catch(function (err) {
      console.log(err);
    })
  }

  getRoles(tenant_id):any{
    this.employeeService.getRoles({tenant_id:tenant_id}).
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
    templateUrl: './addemployee.component.html',
})
export class AddEmployeeComponent extends EmployeeComponent {

    ngOnInit(): void {
        this.screen_name = "Add ";
        this.employeeModel = {employee_number:"",employee_name:"",employee_email:"",employee_password:"",designation:"",role:"",date_of_joining:"",location:"",department:"",confirm_password:"",admin_access:""};
	   this.getRoles(1);
	   this.getlocation();
	   this.getdepartments();
    }
    save_employee():void{

        let validated = this.validate();
        if(validated){
          this.isLoading = true;
          this.employeeModel.tenant_id = 1;
             this.employeeService.insertEmployee(this.employeeModel)
        .then(
          (employeedata) =>{
              this.isLoading = false;
            if(employeedata.status === AppConstants.successStatus){
                let success = {success:true,message:"Employee Added Successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/employee']);
            }
            else{
              this.error_status = true;
              this.errMessage=employeedata.message;
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
    templateUrl: './addemployee.component.html',
})
export class EditEmployeeComponent extends EmployeeComponent {
    ngOnInit(): void {
        this.screen_name = "Edit ";
        this.updateEmployee = true;
        this.activatedRoute.params.subscribe((params: Params) => {
			 this.employee_email = params['employee_email'];
        });
        //this.parameterModel = {parameter_name:"",default_parameter_weightage:"",apraisal_parameter_type:""};
		this.getRoles(1);
        this.get_employee_detail();
      this.getlocation();
      this.getdepartments();
    }
    save_employee():void{
        let validated = this.validate();
        if(validated){
             this.isLoading = true;
          this.employeeModel.tenant_id =1;
            this.employeeService.updateEmployee(this.employee_email,this.employeeModel)
        .then(
          (employeedata) =>{
              this.isLoading = false;
            if(employeedata.status === AppConstants.successStatus){
                let success = {success:true,message:"Employee Details Updated Successfully"};
                this.appservice.setter(success);
              this.router.navigate(['/employee']);
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
    }
}

