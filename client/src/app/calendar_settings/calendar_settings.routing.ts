import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CalendarSettingsComponent } from './calendar_settings.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'CalendarSettings', component: CalendarSettingsComponent, canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
