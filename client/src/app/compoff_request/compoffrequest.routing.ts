import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CompoffRequestComponent } from './compoffrequest.component';
import { AddCompoffRequestComponent,EditCompoffRequestComponent } from './compoffrequest.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'compoff-request', component: CompoffRequestComponent, canActivate: [AuthGuard] },
    { path: 'compoff-request/add', component: AddCompoffRequestComponent, canActivate: [AuthGuard] },
    { path: 'compoff-request/edit/:compoff_id', component: EditCompoffRequestComponent, canActivate: [AuthGuard] }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
