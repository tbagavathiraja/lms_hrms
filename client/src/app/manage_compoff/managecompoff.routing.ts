import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ManageCompoffComponent } from './managecompoff.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'manage-compoff', component: ManageCompoffComponent, canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
