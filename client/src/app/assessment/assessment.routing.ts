import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddAssessmentComponent } from './addassessment.component';
import { ListAssessmentComponent } from './listassessment.component';
import { mapEmployeeWithReportingManagerComponent } from './assessment.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'add-assessment', component: AddAssessmentComponent, canActivate: [AuthGuard] },
    { path: 'list-assessment', component: ListAssessmentComponent, canActivate: [AuthGuard] },
    { path: 'reporting-manager', component: mapEmployeeWithReportingManagerComponent, canActivate: [AuthGuard] },
    
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);