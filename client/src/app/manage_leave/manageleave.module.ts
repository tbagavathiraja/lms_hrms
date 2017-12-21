import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './manageleave.routing';
import { SharedModule } from '../app.sharedmodule';

import { ManageLeaveComponent } from './manageleave.component';
/*import { AddLeaveRequestComponent, } from './manageleave.component';*/

import { ManageLeaveService } from './manageleave.service';
import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [ManageLeaveComponent],
  providers:[ManageLeaveService]
})
export class ManageleaveModule {}
