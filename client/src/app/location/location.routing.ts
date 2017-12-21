import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LocationComponent } from './location.component';
import { AddLocationComponent,EditLocationComponent } from './location.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'location', component: LocationComponent, canActivate: [AuthGuard] },
    { path: 'location/add', component: AddLocationComponent, canActivate: [AuthGuard] },
    { path: 'location/edit/:location_id', component: EditLocationComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);