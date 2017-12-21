import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MyProjectComponent } from './myproject.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'my-project', component: MyProjectComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);