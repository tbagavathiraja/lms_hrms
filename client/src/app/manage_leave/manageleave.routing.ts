import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ManageLeaveComponent } from './manageleave.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'manage-leave', component: ManageLeaveComponent, canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
