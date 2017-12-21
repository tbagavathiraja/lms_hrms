import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './summary.routing';
import { SharedModule } from '../app.sharedmodule';

import { SummaryComponent } from './summary.component';
import { SummaryService } from './summary.service';
import { DataTableModule } from 'angular-4-data-table';
import { ModalModule } from "ng2-modal";
import { MyDatePickerModule } from 'mydatepicker';
import { TAB_COMPONENTS  } from '../app.tabset';
import { AssessmentComponent } from '../assessment/assessment.component';
import { AssessmentService} from '../assessment/assessment.service';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,ModalModule,MyDatePickerModule,SharedModule.forRoot()],
  declarations: [SummaryComponent,TAB_COMPONENTS,AssessmentComponent],
  providers:[SummaryService,AssessmentService]
})
export class SummaryModule {}