import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SummaryComponent } from './summary.component';
import {AuthGuard} from '../guard/auth.guard'
import { AssessmentComponent } from '../assessment/assessment.component';



const routes: Routes = [
    { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
    {path:'assessment/:id',component:AssessmentComponent, canActivate: [AuthGuard]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);