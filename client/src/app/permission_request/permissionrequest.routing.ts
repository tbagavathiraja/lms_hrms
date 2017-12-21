import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PermissionRequestComponent } from './permissionrequest.component';
import { AddPermissionRequestComponent,EditPermissionRequestComponent } from './permissionrequest.component';


import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'permission-request', component: PermissionRequestComponent, canActivate: [AuthGuard] },
    { path: 'permission-request/add', component: AddPermissionRequestComponent, canActivate: [AuthGuard] },
    { path: 'permission-request/edit/:permission_id', component:EditPermissionRequestComponent, canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
