import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './department.routing';
import { SharedModule } from '../app.sharedmodule';

import { DepartmentComponent } from './department.component';
import { AddDepartmentComponent,EditDepartmentComponent } from './department.component';

import { DepartmentService } from './department.service';
import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [DepartmentComponent,AddDepartmentComponent,EditDepartmentComponent],
  providers:[DepartmentService]
})
export class DepartmentModule {}