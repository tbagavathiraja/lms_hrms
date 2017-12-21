import { Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AllRequestService} from "./allrequest.service";
import { RequestService } from "../myrequest/request.service";
import {AppConstants, ErrorConstants} from "../app.constant";
import { AppService } from "../app.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment/moment';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-request',
    templateUrl: './allrequest.component.html',
})
export class AllRequestComponent implements OnInit {
  requestCollection;
  itemCount = 0;
  items = [];
  requestInfo = [];
  success;
  success_message="";
  errMessage = "";
  error={};
  approveRequestId = "";
  requestSummary = [];
  error_status ;
  requestModel;
  resoureModel;
  isLoading:boolean;
  resource_request_list;
  toDatePickerOptions;
    search;
  disableDate = new Date(moment().add(-1, 'days').toDate());
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    inline: false,
    sunHighlight: true,
    satHighlight: true,
    editableDateField:false,
    disableUntil: {year: this.disableDate.getFullYear(), month: this.disableDate.getMonth()+1, day:this.disableDate.getDate()}
  };
  protected storedDetail;
  constructor(
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    protected AllRequestService:AllRequestService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected requestService: RequestService,
    protected appService:AppService
  ){
    console.log(this.appComponent);
    this.appComponent.showIncludes=true;
  }




    ngOnInit(): void {
      this.errMessage = "";
        this.isLoading = true;
      this.getAllRequest();


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
      };
    }else{
      this.toDatePickerOptions = {
        dateFormat: 'dd-mm-yyyy',
        inline: false,
        sunHighlight: true,
        satHighlight: true,
        editableDateField:false,
        componentDisabled:true,
      };
    }

    return this.toDatePickerOptions;
  }

  reloadItems(params) {
    this.requestCollection.query(params).then(items => this.items = items);
  }

    getAllRequest(){
         this.isLoading = true;
        this.storedDetail = this.localStorage.getObject('storedDetails');
        //let getAll = this.storedDetail;
        console.log(this.search)
        let getAll = {"search":this.search};
      this.AllRequestService.getAllRequest(getAll)
        .then(
          (response) =>{
              this.isLoading = false;
            if(response.status === AppConstants.successStatus){
              this.requestCollection = new DataTableResource(response.data);
              this.itemCount = response.data.length;
            }
            else{
              console.log(response);
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
    onApprove(request_id,approveModal){
      this.approveRequestId = request_id;
      this.AllRequestService.getRequestInfo(request_id)
        .then(
          (response) =>{
            if(response.status === AppConstants.successStatus) {
              this.requestInfo = response.data;
              approveModal.open();

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

  handle_request(request_status,approveModal,requestGrid){
      this.isLoading = true;
    this.storedDetail=this.localStorage.getObject('storedDetails');
    let data = {
              'request_status':request_status,
              'approver_employee_id':this.storedDetail.employee_id
    };

    this.AllRequestService.approveRequest(this.approveRequestId,data)
      .then(
        (response) =>{
            this.isLoading = false;
          if(response.status === AppConstants.successStatus) {

            approveModal.close();
            this.success = true;
            this.error_status = false;
            this.success_message = "Request Approved successfully.";
            this.getAllRequest();
            requestGrid.DataTable().ajax.reload();
          }
          else{
            approveModal.close();
            this.error_status = true;
            this.success = false;
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

  showRequestInfo(request_id,approveModal){
      this.isLoading = false;
    this.approveRequestId = request_id;
    this.AllRequestService.getRequestSummary(request_id)
      .then(
        (response) =>{
            this.isLoading = false;
          if(response.status === AppConstants.successStatus) {
            this.requestSummary['project_info'] = response.data.project_info;
            this.requestSummary['request_info'] = response.data.request_info;
            console.log(this.requestSummary);
            approveModal.open();

          }
          else{
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

  validate():boolean{

    if(!this.resource_request_list.length || this.resource_request_list.length < 1){
      this.errMessage = "Please add Resources to the project";
      this.error_status = true;
        this.success = false;
      return false;
    }else{
      for(var i = 0;i< this.resource_request_list.length; i++){
        if(!this.resource_request_list[i].employee_id || this.resource_request_list[i].employee_id == ""){
          this.errMessage = "Please Select employee";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(!this.resource_request_list[i].comments || this.resource_request_list[i].comments == ""){
          this.errMessage = "Please enter valid employee comments";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(!this.resource_request_list[i].request_start_date.formatted || this.resource_request_list[i].request_start_date.formatted == ""){
          this.errMessage = "Please enter start date";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(!this.resource_request_list[i].request_end_date.formatted || this.resource_request_list[i].request_end_date.formatted == ""){
          this.errMessage = "Please enter end date";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(moment(this.resource_request_list[i].request_start_date.formatted).isAfter(moment(this.resource_request_list[i].request_end_date.formatted))){
          this.errMessage = "Please enter valid start and end date";
          this.error_status = true;
            this.success = false;
          return false;
        }
      }
    }

    this.error_status = false;
    return true;
  }

  modifyRequestValidate():boolean{
    if(!this.resource_request_list.length || this.resource_request_list.length < 1){
      this.errMessage = "Please add Resources to the project";
      this.error_status = true;
        this.success = false;
      return false;
    }else{
      for(var i = 0;i< this.resource_request_list.length; i++){
        if(!this.resource_request_list[i].employee_id || this.resource_request_list[i].employee_id == ""){
          this.errMessage = "Please Select employee";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(!this.resource_request_list[i].comments || this.resource_request_list[i].comments == ""){
          this.errMessage = "Please enter valid employee comments";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(!this.resource_request_list[i].request_start_date.formatted || this.resource_request_list[i].request_start_date.formatted == ""){
          this.errMessage = "Please enter start date";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(!this.resource_request_list[i].request_end_date.formatted || this.resource_request_list[i].request_end_date.formatted == ""){
          this.errMessage = "Please enter end date";
          this.error_status = true;
            this.success = false;
          return false;
        }else if(moment(this.resource_request_list[i].request_start_date.formatted, "MM-DD-YYYY").isAfter(moment(this.resource_request_list[i].request_end_date.formatted, "MM-DD-YYYY"))){
          this.errMessage = "Please enter valid start and end date";
          this.error_status = true;
            this.success = false;
          return false;
        }
        else if(!this.resource_request_list[i].status || this.resource_request_list[i].status == "" || this.resource_request_list[i].status == "RAISED"){
          this.errMessage = "Please Select Resource approval status";
          this.error_status = true;
            this.success = false;
          return false;
        }
      }
    }

    this.error_status = false;
    return true;
  }

}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestHandleComponent extends AllRequestComponent {
  resource_request_id = {};
  screen_name = "";

  employee_list;
  approvalStatus  = [];

  ngOnInit() {
    this.screen_name = this.activatedRoute.snapshot.url[1].path;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.resource_request_id = params['resource_request_id'];
    });
    this.approvalStatus = ['APPROVED','REJECTED','HOLD'];
    this.requestModel = {'project_id':"",'project_name':"",'comments':""};
    this.resoureModel = {'employee_id':"",'comments':"",'request_start_date':"",'request_end_date':"",'status':""};

    this.getEmployees();
    this.showRequestInfo();

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

  hideEmployee(){
    var emp = [];
    for(var i=0;i<this.employee_list.length;i++){
      this.employee_list[i]['is_selected'] = 0;
    }

    this.resource_request_list.forEach(function(value){
      emp.push(value.employee_id);
    });

    console.log(this.employee_list);
    for(var i=0;i < this.employee_list.length;i++) {
      for(var j = 0;j< emp.length; j++){
        if (emp[j]===this.employee_list[i].employee_id) {
          this.employee_list[i]['is_selected'] = 1;
        }
      }

    }
    console.log(this.employee_list);
  }

  showRequestInfo(){
      this.isLoading = true;
    this.requestService.getRequestInfo(this.resource_request_id)
      .then(
        (response) =>{
            this.isLoading = false;
          if(response.status === AppConstants.successStatus) {
            this.requestModel = response.data.project_info[0];
            this.resource_request_list = response.data.request_info;

            for(var i = 0 ; i < this.resource_request_list.length ; i++){
              var start_date = new Date(moment(this.resource_request_list[i]['request_start_date'],"DD-MM-YYYY").toDate());
              var end_date = new Date(moment(this.resource_request_list[i]['request_end_date'],"DD-MM-YYYY").toDate());
              this.resource_request_list[i].request_start_date = { date: { year: start_date.getFullYear(), month: start_date.getMonth()+1, day: start_date.getDate() }, jsdate: start_date, formatted: this.resource_request_list[i]['request_start_date'] };
              this.resource_request_list[i].request_end_date = { date: { year: end_date.getFullYear(), month: end_date.getMonth()+1, day: end_date.getDate() }, jsdate: end_date, formatted: this.resource_request_list[i]['request_end_date'] };
            }
            this.hideEmployee();
          }
          else{
            console.log(response);
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

  modifyRequest():void{
      this.isLoading = true;
    let validated = this.modifyRequestValidate();
    if(validated){
      this.storedDetail=this.localStorage.getObject('storedDetails');
      var data = {
        'employee_id' :this.storedDetail.employee_id,
        'project_info':this.requestModel,
        'resource_info':this.resource_request_list
      };

      this.AllRequestService.modifyRequest(this.resource_request_id,data)
        .then(
          (responsedata) =>{
              this.isLoading = false;
            if(responsedata.status === AppConstants.successStatus){
              let success = {success:true,message:"Request updated Successfully"};
              this.appService.setter(success);
              this.router.navigate(['/all-request']);
            }
            else{
              this.error={};
              this.error_status = true;
                this.success = false;
              this.errMessage=responsedata.message;
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




