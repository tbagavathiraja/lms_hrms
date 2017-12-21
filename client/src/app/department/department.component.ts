import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {DepartmentService} from "./department.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'dep-summary',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
    errMessage = "";
    success:boolean;
    success_message:string;
    error={};
    protected storedDetail;
    screen_name;
    isLoading:boolean;
	employee_email;
    departments;
    itemCount=0;
    items = [];
    error_status:boolean;
    search;
    saveDetail;
    types;
    department_id;

    constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
        // public modal:Modal,
        protected departmentService:DepartmentService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService
    ){
        this.appComponent.showIncludes=true;
        
    }
    delete_modal(department_id,modal){
        this.department_id = department_id;
        modal.open();
    }
    delete_department(deleteModal){
        this.isLoading = true;
        this.departmentService.deleteDepartment(this.department_id)
        .then((leaveata) =>{
            if(leaveata.status === AppConstants.successStatus){
                this.isLoading = false;
                this.getDepartment();
                this.success=true;
                deleteModal.close();
                this.success_message='Department Deleted Successfully'
            }
        });
    }
    getDepartment(){
        this.isLoading = true;
        let getall={"search":this.search};
        this.departmentService.getDepartment(getall).then( (res)=> {
        
        this.itemCount = 0;
        var array = [];
        this.departments =new DataTableResource(array);
        if(res.data){
            this.departments =new DataTableResource(res.data);
            this.itemCount = res.data.length;
        }
        this.isLoading = false;
        }).catch(function(err){
            console.log(err);
        })
    }
    reloadItems(params) {
        this.departments.query(params).then(items => this.items = items);
    }

    validate(){
        if(!this.saveDetail.department_name || this.saveDetail.department_name == ''){
            this.error_status = true;
            this.errMessage = "Please enter department name";
            return false;
        }
        if(!this.saveDetail.description || this.saveDetail.description == ''){
            this.error_status = true;
            this.errMessage = "Please enter description";
            return false;
        }
        this.error_status = false;
        this.errMessage = "";
        return true;
    }
    ngOnInit() {
        this.errMessage = "";
        let success_msg = this.appservice.getter();
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.getDepartment();
    
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
}
@Component({
  selector: 'app-request',
    templateUrl: './adddepartment.component.html',
})
export class AddDepartmentComponent extends DepartmentComponent {
    
    ngOnInit(): void {
        this.screen_name = "Add ";
        this.saveDetail = {department_name:'',description:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
    }
    save_department() {
        if(!this.validate()){
            return false;
        }
        this.departmentService.insertDepartment(this.saveDetail).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Department added successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/department']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

@Component({
  selector: 'app-request',
    templateUrl: './adddepartment.component.html',
})
    
export class EditDepartmentComponent extends DepartmentComponent {
    
    ngOnInit(): void {
        this.screen_name = "Edit ";
        this.saveDetail = {department_name:'',description:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.activatedRoute.params.subscribe((params: Params) => {
             this.department_id = params['department_id'];
        });
        this.get_details(this.department_id);
    }
    get_details(department_id) {
        this.departmentService.getDepartmentDetails(department_id).then((res)=> {
            if(res.status === AppConstants.successStatus) {
                this.saveDetail = res.data[0];
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    save_department() {
        if(!this.validate()){
            return false;
        }
        this.departmentService.updateDepartment(this.department_id,this.saveDetail).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Department updated successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/department']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    
}

