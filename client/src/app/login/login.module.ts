import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent }   from './login.component';
import { routing } from './login.routing';
import { LoginService } from './login.service';

@NgModule({
  imports: [routing, BrowserModule,FormsModule,HttpModule,],
  declarations: [LoginComponent],
  providers:[LoginService]
})
export class LoginModule {}