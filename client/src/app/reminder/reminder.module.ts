import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './reminder.routing';
import { SharedModule } from '../app.sharedmodule';

import { ReminderComponent } from './reminder.component';
import { ReminderService } from './reminder.service';

import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [ReminderComponent],
  providers:[ReminderService]
})
export class ReminderModule {}