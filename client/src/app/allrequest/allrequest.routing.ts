import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AllRequestComponent,RequestHandleComponent } from './allrequest.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    {path:'all-request',component:AllRequestComponent, canActivate: [AuthGuard]},
    {path:'all-request/approve/:resource_request_id',component:RequestHandleComponent, canActivate: [AuthGuard]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);