import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './allrequest.routing';
import { SharedModule } from '../app.sharedmodule';

import { AllRequestComponent,RequestHandleComponent } from './allrequest.component';
import { AllRequestService } from './allrequest.service';

import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [AllRequestComponent,RequestHandleComponent],
  providers:[AllRequestService]
})
export class AllRequestModule {}