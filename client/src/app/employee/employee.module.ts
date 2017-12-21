import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './employee.routing';
import { SharedModule } from '../app.sharedmodule';

import { EmployeeComponent } from './employee.component';
import { AddEmployeeComponent } from './employee.component';
import { EditEmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [EmployeeComponent,AddEmployeeComponent,EditEmployeeComponent],
  providers:[EmployeeService]
})
export class EmployeeModule {}