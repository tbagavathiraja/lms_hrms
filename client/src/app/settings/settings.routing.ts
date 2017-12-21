import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SettingsComponent } from './settings.component';
import { EditSettingsComponent } from'./settings.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/edit/:settings_id', component: EditSettingsComponent, canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
