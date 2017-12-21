import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LeaveRequestComponent } from './leaverequest.component';
import { AddLeaveRequestComponent,EditLeaveRequestComponent } from './leaverequest.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'leave-request', component: LeaveRequestComponent, canActivate: [AuthGuard] },
    { path: 'leave-request/add', component: AddLeaveRequestComponent, canActivate: [AuthGuard] },
    { path: 'leave-request/edit/:leave_id', component: EditLeaveRequestComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);