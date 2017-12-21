import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {LocationService} from "./location.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {
    errMessage = "";
    success:boolean;
    success_message:string;
    error={};
    protected storedDetail;
    screen_name;
    isLoading:boolean;
    locations;
    itemCount=0;
    items = [];
    error_status:boolean;
    search;
    saveDetail;
    types;
    location_id;
    constructor(
        private appComponent:AppComponent,
        public localStorage: CoolLocalStorage,
        // public modal:Modal,
        protected locationService:LocationService,
        protected route :ActivatedRoute,
        protected router :Router,
        protected activatedRoute: ActivatedRoute,
        protected appservice:AppService
    ){
        this.appComponent.showIncludes=true;

    }
    delete_modal(location_id,modal){
        this.location_id = location_id;
        modal.open();
    }
    delete_location(deleteModal){
        this.isLoading = true;
        this.locationService.deleteLocation(this.location_id)
        .then((leaveata) =>{
            if(leaveata.status === AppConstants.successStatus){
                this.isLoading = false;
                this.getLocation();
                this.success=true;
                deleteModal.close();
                this.success_message=' Leave Deleted Successfully'
            }
        });
    }
    getLocation(){
        this.isLoading = true;
        let getall={"search":this.search};
        this.locationService.getAllLocatoin(getall).then( (res)=> {

        this.itemCount = 0;
        var array = [];
        this.locations =new DataTableResource(array);
        if(res.data){
            this.locations =new DataTableResource(res.data);
            this.itemCount = res.data.length;
        }
        this.isLoading = false;
        }).catch(function(err){
            console.log(err);
        })
    }
    reloadItems(params) {
        this.locations.query(params).then(items => this.items = items);
    }

    validate(){
        if(!this.saveDetail.location_number || this.saveDetail.location_number == ''){
            this.error_status = true;
            this.errMessage = "Please enter location number";
            return false;
        }
        if(isNaN(this.saveDetail.location_number)){
            this.error_status = true;
            this.errMessage = "Please enter valid location number";
            return false;
        }
        if(!this.saveDetail.location_name || this.saveDetail.location_name == ''){
            this.error_status = true;
            this.errMessage = "Please enter location name";
            return false;
        }
        if(!this.saveDetail.location_street || this.saveDetail.location_street == ''){
            this.error_status = true;
            this.errMessage = "Please enter location street";
            return false;
        }
        if(!this.saveDetail.location_city || this.saveDetail.location_city == ''){
            this.error_status = true;
            this.errMessage = "Please enter location city";
            return false;
        }
        if(!this.saveDetail.location_state || this.saveDetail.location_state == ''){
            this.error_status = true;
            this.errMessage = "Please enter location state";
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
        this.getLocation();

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
    templateUrl: './addlocation.component.html',
})
export class AddLocationComponent extends LocationComponent {

    ngOnInit(): void {
        this.screen_name = "Add ";
        this.saveDetail = {leave_type:'',reason:'',from_date:'',todate:'',number_of_days:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
    }
    save_location() {
        if(!this.validate()){
            return false;
        }
        this.locationService.insertLocation(this.saveDetail).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Location Added successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/location']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

@Component({
  selector: 'app-request',
    templateUrl: './addlocation.component.html',
})

export class EditLocationComponent extends LocationComponent {

    ngOnInit(): void {
        this.screen_name = "Edit ";
        this.saveDetail = {leave_type:'',reason:'',from_date:'',todate:'',number_of_days:''};
        this.storedDetail=this.localStorage.getObject('storedDetails');
        this.activatedRoute.params.subscribe((params: Params) => {
             this.location_id = params['location_id'];
        });
        this.getLocationDetails(this.location_id);
    }
    getLocationDetails(location_id) {
        this.locationService.getLocationDetails(location_id).then((res)=> {
            if(res.status === AppConstants.successStatus) {
                this.saveDetail = res.data[0];
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    save_location() {
        if(!this.validate()){
            return false;
        }
        this.locationService.updateLocation(this.location_id,this.saveDetail).then((res) => {
            if(res.status == AppConstants.successStatus){
                let success = {success:true,message:"Location updated successfully"};
                this.appservice.setter(success);
                this.router.navigate(['/location']);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

}

