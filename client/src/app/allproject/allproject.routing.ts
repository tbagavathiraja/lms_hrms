import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AllProjectComponent } from './allproject.component';

import { AuthGuard } from '../guard/auth.guard'



const routes: Routes = [
    {path:'all-projects',component:AllProjectComponent, canActivate: [AuthGuard]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);