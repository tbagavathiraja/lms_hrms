import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ManagePermissionComponent } from './managepermission.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'manage-permission', component: ManagePermissionComponent, canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
