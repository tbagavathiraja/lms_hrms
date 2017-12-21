import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DepartmentComponent } from './department.component';
import { AddDepartmentComponent,EditDepartmentComponent } from './department.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
    { path: 'department/add', component: AddDepartmentComponent, canActivate: [AuthGuard] },
    { path: 'department/edit/:department_id', component: EditDepartmentComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);