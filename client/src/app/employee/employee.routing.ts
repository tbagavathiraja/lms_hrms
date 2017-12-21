import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EmployeeComponent } from './employee.component';
import { AddEmployeeComponent } from './employee.component';
import { EditEmployeeComponent } from './employee.component';
import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
    { path: 'employee/add', component: AddEmployeeComponent, canActivate: [AuthGuard] },
    { path: 'employee/edit/:employee_email', component: EditEmployeeComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);