import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../app.sharedmodule';

import { MyRequestComponent,AddRequestComponent,EditRequestComponent } from './myrequest.component';
import { RequestService } from './request.service';
import { routing } from './myrequest.routing';

import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [MyRequestComponent,AddRequestComponent,EditRequestComponent],
  providers:[RequestService]
})
export class MyRequestModule {}