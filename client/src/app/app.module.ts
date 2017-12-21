import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppService } from './app.service'
import { AppComponent } from './app.component';

//the below is the screen wise components
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginModule } from './login/login.module';
import { EmployeeModule } from './employee/employee.module';
import { SummaryModule } from './summary/summary.module';
import { AssessmentModule } from './assessment/assessment.module';
import { AssessmentParameterModule } from './assessmentparameter/assessmentparameter.module';
import { PeriodModule } from './period/period.module';
import { MyRequestModule } from './myrequest/myrequest.module';
import { MyProjectModule } from './project/myproject.module';
import { ReminderModule } from './reminder/reminder.module';
import { AllRequestModule } from './allrequest/allrequest.module';
import { AllProjectModule } from './allproject/allproject.module';
import {LeaveRequestModule} from './leave_request/leaverequest.module';
import { PermissionRequestModule } from './permission_request/permissionrequest.module';
import {CompoffRequestModule} from './compoff_request/compoffrequest.module';
import { ManageleaveModule} from './manage_leave/manageleave.module';
import {HolidayModule} from './holiday/holiday.module';
import {AdminHolidayModule} from './admin_holiday/adminholiday.module';
import {DepartmentModule} from './department/department.module';
import {LocationModule} from './location/location.module';
import {ManagePermissionModule} from './manage_permission/managepermission.module';
import{ManagecompoffModule} from './manage_compoff/managecompoff.module';
import{MyProfileModule} from './myProfile/myprofile.module';
//import{EmployeeHistoryModule} from './employee_history/employee_history.module';
 import{CalendarSettingsModule} from "./calendar_settings/calendar_settings.module";


import { Angular2SocialLoginModule } from "angular2-social-login";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2PaginationModule } from 'ng2-pagination'; // <-- import the module
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoolStorageModule } from 'angular2-cool-storage';

import { SharedModule } from './app.sharedmodule';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { SelectModule } from 'ng2-select';
import { AuthGuard } from './guard/auth.guard';
import { ResetPasswordModule } from './reset-password/reset-password.module'


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

//client id for apps server
let providers = {
  "google": {
    "clientId": "1060935643581-jgp5lk9sj8r3g9hlhhns3fnki8n2o2fc.apps.googleusercontent.com"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routes,ResetPasswordModule,
    Angular2SocialLoginModule, Ng2PaginationModule, CoolStorageModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    SelectModule,SharedModule.forRoot(),
    LoginModule, EmployeeModule, SummaryModule, AssessmentModule, PeriodModule, MyRequestModule, AssessmentParameterModule,
    MyProjectModule, ReminderModule, AllRequestModule, AllProjectModule, LeaveRequestModule,PermissionRequestModule,ManageleaveModule,
    CompoffRequestModule,HolidayModule,AdminHolidayModule,DepartmentModule,LocationModule,ManagePermissionModule,ManagecompoffModule,MyProfileModule,CalendarSettingsModule
  ],
  providers: [
    AppService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
