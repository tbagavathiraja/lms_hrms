import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './assessmentparameter.routing';
import { SharedModule } from '../app.sharedmodule';

import { AssessmentParameterComponent } from './assessmentparameter.component';
import { AddAssessmentParameterComponent } from './assessmentparameter.component';
import { EditAssessmentParameterComponent } from './assessmentparameter.component';
import { AssessmentParameterService } from './assessmentparameter.service';

import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
//import { dateFormatPipe,skipUnderScore,removeSpaces,capitalise,numberFixedLen,normalDate,keyValues,toPercent,Pairs } from '../app.filter';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [AssessmentParameterComponent,AddAssessmentParameterComponent,EditAssessmentParameterComponent],
  providers:[AssessmentParameterService]
})
export class AssessmentParameterModule {}