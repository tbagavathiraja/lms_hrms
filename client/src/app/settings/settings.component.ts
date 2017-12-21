import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {SettingsService} from "./settings.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppConstants, ErrorConstants} from "../app.constant";
import {AppService} from "../app.service";
import {IMyDpOptions,IMyDate, IMyDateModel} from 'mydatepicker';
import { DataTableResource } from 'angular-4-data-table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-summary',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  errMessage = "";
  showrecords: boolean;
  success: boolean;
  success_message: string;
  error = {};
  protected storedDetail;
  screen_name;
  isLoading: boolean;
  employee_email;
  itemCount = 0;
  items = [];
  error_status: boolean;
  mysettings;
  editSettingsdetail = {};
  settings_id;


  constructor(private appComponent: AppComponent,
              public localStorage: CoolLocalStorage,
              protected settingsService: SettingsService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected appservice: AppService) {
    this.appComponent.showIncludes = true;

  }

  ngOnInit() {
    this.errMessage = "";
    let success_msg = this.appservice.getter();
    this.getSettings();
    if (success_msg) {
      if (success_msg.success) {
        this.success = true;
        this.success_message = success_msg.message;
        let success = {success: false, message: ""};
        this.appservice.setter(success);
      } else {
        this.success = false;
      }

    } else {
      this.success = false;
    }
  }

  reloadItems(params) {
    this.mysettings.query(params).then(items => this.items = items);
  }

  getSettings() {
    this.isLoading = true;
    this.settingsService.getAll().then((res) => {
      console.log(res);
      if (res.message == 'No records found') {
        this.isLoading = false;
        this.showrecords = true;
        this.success_message = "No Records Found";
        this.itemCount = 0;
      } else {
        if (res.status == AppConstants.successStatus) {
          this.isLoading = false;
          this.mysettings = res.data;
          this.mysettings = new DataTableResource(res.data);
          this.itemCount = res.data.length;
        }
      }
    }).catch(function (err) {
      console.log(err);
    })

  }

}
  @Component({
    selector: 'app-request',
    templateUrl: './Editsettings.component.html',
  })

  export class EditSettingsComponent extends SettingsComponent {

    ngOnInit(): void {
      this.screen_name = "Edit ";
      this.activatedRoute.params.subscribe((params: Params) => {
        this.settings_id = params['settings_id'];
      });
      this.get_settingsDetails(this.settings_id);
     }


    get_settingsDetails(settings_id) {
      let setingsId={"settings_id":settings_id};
      this.settingsService.get_edit_settings(setingsId).then((res)=> {
        if(res.status === AppConstants.successStatus) {
          this.editSettingsdetail = res.data[0];
        }
      }).catch((err)=>{
        console.log(err);
      })
    }

  edit_Detail() {
    this.isLoading = true;
    this.settingsService.edit_settings(this.editSettingsdetail).then((res)=> {
      if(res.status == AppConstants.successStatus) {
        this.isLoading = false;
        this.success=true;
        let success = {success:true,message:"Setings Edited Successfully"};
        this.appservice.setter(success);
        this.router.navigate(['/settings']);
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

}


