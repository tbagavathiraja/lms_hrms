import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './adminholiday.routing';
import { SharedModule } from '../app.sharedmodule';

import { AdminHolidayComponent,AddHolidayComponent,EditHolidayComponent } from './adminholiday.component';

import { AdminHolidayService } from './adminholiday.service';
import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [AdminHolidayComponent,AddHolidayComponent,EditHolidayComponent],
  providers:[AdminHolidayService]
})
export class AdminHolidayModule {}