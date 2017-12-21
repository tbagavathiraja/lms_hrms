import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HolidayComponent } from './holiday.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'holiday', component: HolidayComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);