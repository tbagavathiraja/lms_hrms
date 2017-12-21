import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './assessment.routing';
import { SharedModule } from '../app.sharedmodule';

import { AddAssessmentComponent } from './addassessment.component';
import { ListAssessmentComponent } from './listassessment.component';
import { mapEmployeeWithReportingManagerComponent } from './assessment.component';

import { AssessmentService} from './assessment.service';
import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [AddAssessmentComponent,ListAssessmentComponent,mapEmployeeWithReportingManagerComponent],
  providers:[AssessmentService]
})
export class AssessmentModule {}