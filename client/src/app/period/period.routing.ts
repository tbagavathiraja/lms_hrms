import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PeriodComponent } from './period.component';
import { AddPeriodComponent } from './period.component';
import { EditPeriodComponent } from './period.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'period', component: PeriodComponent, canActivate: [AuthGuard] },
    { path: 'period/add', component: AddPeriodComponent, canActivate: [AuthGuard] },
    { path: 'period/edit/:period_id', component: EditPeriodComponent, canActivate: [AuthGuard] },
    
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);