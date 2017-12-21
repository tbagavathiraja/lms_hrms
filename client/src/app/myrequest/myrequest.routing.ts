import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MyRequestComponent,AddRequestComponent,EditRequestComponent } from './myrequest.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'my-request', component: MyRequestComponent, canActivate: [AuthGuard] },
    { path: 'my-request/add', component: AddRequestComponent, canActivate: [AuthGuard] },
    { path: 'my-request/edit/:resource_request_id', component: EditRequestComponent, canActivate: [AuthGuard] },
    { path: 'my-request/clone/:resource_request_id',component:EditRequestComponent, canActivate: [AuthGuard]},
    
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);