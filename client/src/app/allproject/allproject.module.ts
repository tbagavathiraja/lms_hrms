import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './allproject.routing';
import { SharedModule } from '../app.sharedmodule';

import { AllProjectComponent } from './allproject.component';
import { AllProjectService } from './allproject.service';

import { DataTableModule } from 'angular-4-data-table';


@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,DataTableModule,SharedModule.forRoot()],
  declarations: [AllProjectComponent],
  providers:[AllProjectService]
})
export class AllProjectModule {}