import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ReminderComponent } from './reminder.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'my-reminder', component: ReminderComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);