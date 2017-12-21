import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResetPasswordService } from './reset-password.service'
import {ResetPasswordComponent} from './reset-password.component'

@NgModule({
  imports: [BrowserModule,FormsModule,HttpModule],
  declarations: [ResetPasswordComponent],
  providers:[ResetPasswordService]
})
export class ResetPasswordModule {}
