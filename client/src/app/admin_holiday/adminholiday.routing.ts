import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminHolidayComponent,AddHolidayComponent,EditHolidayComponent } from './adminholiday.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'admin-holiday', component: AdminHolidayComponent, canActivate: [AuthGuard] },
    { path: 'admin-holiday/add', component: AddHolidayComponent, canActivate: [AuthGuard] },
    { path: 'admin-holiday/edit/:holiday_id', component: EditHolidayComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);