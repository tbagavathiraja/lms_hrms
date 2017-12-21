import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';


import {AuthGuard} from './guard/auth.guard'

export const router : Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
  
  {path: '**', redirectTo: 'login' }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router,{useHash:true});
