import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {CalendarSettingsService} from "./calendar_settings.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";

@Component({
  selector: 'app-summary',
  templateUrl: './calendar_settings.component.html',
  styleUrls: ['./calendar_settings.component.css']
})
export class CalendarSettingsComponent implements OnInit {

  errMessage = "";
  showrecords: boolean;
  success: boolean;
  success_message: string;
  error = {};
  branches: any;
  isLoading: boolean;
  calendarform;
  locationDetails:any[];
  branchDetails:any[];
  error_status: boolean;



  constructor(private appComponent: AppComponent,
              public localStorage: CoolLocalStorage,
              protected calendarSettingsService: CalendarSettingsService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected appservice: AppService) {
    this.appComponent.showIncludes = true;
  }

  ngOnInit(){
    this.getbranch();
    this.calendarform={location_id:"",isWorking:[]};
    this.branchDetails=['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  }

  clicked(index,value){
    this.calendarform.isWorking[index] = value;
  }

  onChange(location_id){
    let location ={"location_id":location_id}
    this.calendarSettingsService.getBranch(location).then((res) => {
      this.locationDetails=res.data;
      let days = this.locationDetails[0];
      let flag = 0;
      for(let entry  of this.branchDetails)
      { console.log(days[entry])
        if(days[entry] == 1){
          this.calendarform.isWorking[flag] = true;
        }
        flag++;
      }
    }).catch(function (err) {
      console.log(err);
    })
  }

  getbranch() {
    this.calendarSettingsService.getAllbranch().then((res) => {
      this.branches = res.data;
    }).catch(function (err) {
      console.log(err);
    })
  }

  validate(){
    if(!this.calendarform.location_id || this.calendarform.location_id == ''){
      this.error_status = true;
      this.errMessage = "Please select Location";
      return false;
    }
    return true;
  }

  submit() {
    if(!this.validate()){
      return false;
    }
    this.calendarSettingsService.insertDaysGlobal(this.calendarform)
      .then((res) => {
        if(res.status == AppConstants.successStatus) {
          this.success=true;
          this.success_message=' Schedule Added Successfully';
          this.error_status=false;
        }
      }).catch(function (err) {
      console.log(err);
    })
  }


}


