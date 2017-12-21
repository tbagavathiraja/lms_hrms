import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MyProfileComponent } from './myprofile.component';
import { EditMyProfileComponent } from './myprofile.component';
import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'MyProfile', component: MyProfileComponent, canActivate: [AuthGuard] },
    { path: 'MyProfile/edit/:employee_email', component: EditMyProfileComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
