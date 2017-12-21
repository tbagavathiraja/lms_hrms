import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {RequestService} from "./request.service";
import {AppConstants, ErrorConstants} from "../app.constant";
import { AppService } from "../app.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment/moment';
import { DataTableResource } from 'angular-4-data-table';

@Component({
    selector: 'app-request',
    templateUrl: './myrequest.component.html',
})
export class MyRequestComponent implements OnInit {
    requestCollection;
    errMessage = "";
    error={};
    success_message:string;
    success:boolean;
    screen_name;
    requestModel;
    resoureModel;
    project_list = [];
    employee_list = [];
    isLoading:boolean;
    real_employee_list=[];
    resource_request_list = [];
    emp_copy = {};
    search;
    delete_resource_request_id = "";
    disableDate = new Date(moment().add(-1, 'days').toDate());
    toDatePickerOptions;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        alignSelectorRight:true,
	disableUntil: {year: this.disableDate.getFullYear(), month: this.disableDate.getMonth()+1, day:this.disableDate.getDate()}
    };
    itemCount = 0;
    items = [];
    public storedDetail;
  constructor(
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    protected requestService:RequestService,
    protected appService:AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected appservice:AppService
  ){
    console.log(this.appComponent);
    this.appComponent.showIncludes=true;
  }
    
    toDatePickerOption(index){
        if(this.resource_request_list[index].request_start_date){
            var today = new Date(this.resource_request_list[index].request_start_date.jsdate);
            var yesterday = new Date(today.getTime() - (24*60*60*1000));
            var disable_date = {year:yesterday.getFullYear(),month:yesterday.getUTCMonth()+1,day:yesterday.getDate()};
            this.toDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
              inline: false,
              sunHighlight: true,
              satHighlight: true,
              editableDateField:false,
              disableUntil:disable_date,
              componentDisabled:false,
              alignSelectorRight:true
            };
        }else{
            this.toDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
              inline: false,
              sunHighlight: true,
              satHighlight: true,
              editableDateField:false,
              componentDisabled:true,
              alignSelectorRight:true
            };
        }
          
        return this.toDatePickerOptions;
    }

  getProjects(){
      this.isLoading = true;
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.requestService.getProjectList(this.storedDetail)
      .then(
        (responseData) =>{
            this.isLoading = false;
          if(responseData.status === AppConstants.successStatus){
            this.project_list = responseData.data;
          }
          else{
            this.error=responseData;
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

  getEmployees(){
      this.isLoading = true;
    this.storedDetail=this.localStorage.getObject('storedDetails');
    this.requestService.getEmployeeList(this.storedDetail)
      .then(
        (responseData) =>{
            this.isLoading = false;
          if(responseData.status === AppConstants.successStatus){
            this.employee_list = responseData.data;
            for(var i=0;i<this.employee_list.length;i++){
              this.employee_list[i]['is_selected'] = 0;
            }
          }
          else{
            this.error=responseData;
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

  onDelete(request_id,deleteModal){
    this.delete_resource_request_id = request_id;
    deleteModal.open();
  }
  confirm_delete(deleteModal){
    var data = {'resource_request_id':this.delete_resource_request_id }
    this.requestService.deleteRequest(data)
      .then(
        (response) =>{
          if(response.status === AppConstants.successStatus) {
            
            deleteModal.close();
            this.success = true;
            this.success_message = "Request deleted successfully."
              this.getAllRequest();
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
        this.errMessage=error.message;
      }

    });

  }

  reloadItems(params) {
    this.requestCollection.query(params).then(items => this.items = items);
  }

  getAllRequest(){
      this.isLoading = true;
      let getAll = this.storedDetail;
      getAll.search = this.search;
    this.requestService.getRequestSummary(getAll)
      .then(
        (response) =>{
          if(response.status === AppConstants.successStatus){

            this.requestCollection = new DataTableResource(response.data);
            this.itemCount = response.data.length;
              this.isLoading = false;
          }
          else{
            console.log(this.storedDetail);
            this.errMessage=response.message;
            this.isLoading = false
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
        this.isLoading = true;
        this.getAllRequest();
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
}

@Component({
  selector: 'app-request',
  templateUrl: './add-request.html',
})
export class AddRequestComponent extends MyRequestComponent {

  project_list = [];
  employee_list = [];
  error_status:boolean;
  employee=[];
  ngOnInit(): void {
    this.screen_name = "add";

    this.requestModel = {'project_id':"",'comments':""};
    this.resoureModel = {'employee_id':"",'comments':"",'request_start_date':"",'request_end_date':""};
    const copy = { ...this.resoureModel }
    this.resource_request_list.push(copy);
    this.getProjects();
    this.getEmployees();
  }

  addResource(){
    const copy = { ...this.resoureModel }
    this.resource_request_list.push(copy);
  }

  removeResource(index) {
      this.resource_request_list.splice(index, 1);
      this.hideEmployee();
  }

  hideEmployee(){
    var emp = [];
    for(var i=0;i<this.employee_list.length;i++){
      this.employee_list[i]['is_selected'] = 0;
    }

    this.resource_request_list.forEach(function(value){
      emp.push(value.employee_id);
    });
    for(var i=0;i < this.employee_list.length;i++) {
      for(var j = 0;j< emp.length; j++){
        if (emp[j]===this.employee_list[i].employee_id) {
          this.employee_list[i]['is_selected'] = 1;
        }
      }

    }
  }

  validate():boolean{

    console.log(this.requestModel);
    if(!this.requestModel.project_id || this.requestModel.project_id == ""){
      this.error_status = true;
      this.errMessage = "Please Select Project";
      return false;
    }else if(!this.requestModel.comments || this.requestModel.comments == ""){
      this.errMessage = "Please enter project comments";
      this.error_status = true;
      return false;
    }else if(!this.resource_request_list.length || this.resource_request_list.length < 1){
      this.errMessage = "Please add Resources to the project";
      this.error_status = true;
      return false;
    }else{
      for(var i = 0;i< this.resource_request_list.length; i++){
        if(!this.resource_request_list[i].employee_id || this.resource_request_list[i].employee_id == ""){
          this.errMessage = "Please Select employee";
          this.error_status = true;
          return false;
        }else if(!this.resource_request_list[i].comments || this.resource_request_list[i].comments == ""){
          this.errMessage = "Please enter employee comments";
          this.error_status = true;
          return false;
        }else if(!this.resource_request_list[i].request_start_date || this.resource_request_list[i].request_start_date == ""){
          this.errMessage = "Please select start date";
          this.error_status = true;
          return false;
        }else if(!this.resource_request_list[i].request_start_date.formatted || this.resource_request_list[i].request_start_date.formatted == ""){
          this.errMessage = "Please select start date";
          this.error_status = true;
          return false;
        }else if(!this.resource_request_list[i].request_end_date || this.resource_request_list[i].request_end_date == ""){
          this.errMessage = "Please select end date";
          this.error_status = true;
          return false;
        }else if(!this.resource_request_list[i].request_end_date.formatted || this.resource_request_list[i].request_end_date.formatted == ""){
          this.errMessage = "Please select end date";
          this.error_status = true;
          return false;
        }else if(moment(this.resource_request_list[i].request_start_date.formatted,'DD-MM-YYYY').isAfter(moment(this.resource_request_list[i].request_end_date.formatted,'DD-MM-YYYY'),'day')){
          this.errMessage = "Please enter valid start and end date";
          this.error_status = true;
          return false;
        }
      }
    }

    this.error_status = false;
    return true;
  }

  save_request():void{
    let validated = this.validate();
    if(validated){
      this.isLoading = true;
      this.storedDetail=this.localStorage.getObject('storedDetails');
      var data = {
        'employee_id' :this.storedDetail.employee_id,
        'project_info':this.requestModel,
        'resource_info':this.resource_request_list
      };

      this.requestService.insertRequest(data)
        .then(
          (responsedata) =>{
            if(responsedata.status === AppConstants.successStatus){
              let success = {success:true,message:"Request Added Successfully"};
              this.appService.setter(success);
              this.router.navigate(['/my-request']);
                this.isLoading = false;
            }
            else{
                this.isLoading = false;
              this.error=responsedata;
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
  templateUrl: './add-request.html',
})
export class EditRequestComponent extends AddRequestComponent {
  resource_request_id = {};

  ngOnInit() {
    this.screen_name = this.activatedRoute.snapshot.url[1].path;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.resource_request_id = params['resource_request_id'];
    });

    this.requestModel = {'project_id':"",'comments':""};
    this.resoureModel = {'employee_id':"",'comments':"",'request_start_date':"",'request_end_date':""};


    this.getProjects();
    this.getEmployees();
    this.showRequestInfo();

  }


  showRequestInfo(){
    this.requestService.getRequestInfo(this.resource_request_id)
      .then(
        (response) =>{
          if(response.status === AppConstants.successStatus) {
            this.requestModel = response.data.project_info[0];
            this.resource_request_list = response.data.request_info;
            for(var i = 0 ; i < this.resource_request_list.length ; i++){
              var start_date = new Date(moment(this.resource_request_list[i]['request_start_date'],"DD-MM-YYYY").toDate());
              var end_date = new Date(moment(this.resource_request_list[i]['request_end_date'],"DD-MM-YYYY").toDate());
              this.resource_request_list[i].request_start_date = { date: { year: start_date.getFullYear(), month: start_date.getMonth()+1, day: start_date.getDate() }, jsdate: start_date, formatted: this.resource_request_list[i]['request_start_date'] };
              this.resource_request_list[i].request_end_date = { date: { year: end_date.getFullYear(), month: end_date.getMonth()+1, day: end_date.getDate() }, jsdate: end_date, formatted: this.resource_request_list[i]['request_end_date'] };
            }
            console.log(response);

          }
          else{
            console.log(response);
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

  updateRequest():void{
    let validated = this.validate();
    if(validated){
      this.isLoading = true;
      this.storedDetail=this.localStorage.getObject('storedDetails');
      var data = {
        'employee_id' :this.storedDetail.employee_id,
        'project_info':this.requestModel,
        'resource_info':this.resource_request_list
      };

      this.requestService.updateRequest(this.resource_request_id,data)
        .then(
          (responsedata) =>{
            if(responsedata.status === AppConstants.successStatus){
              let success = {success:true,message:"Request updated Successfully"};
              this.appService.setter(success);
              this.router.navigate(['/my-request']);
              this.isLoading = false;
            }
            else{
              this.error=responsedata;
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



