import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AssessmentParameterComponent } from './assessmentparameter.component';
import { AddAssessmentParameterComponent } from './assessmentparameter.component';
import { EditAssessmentParameterComponent } from './assessmentparameter.component';

import {AuthGuard} from '../guard/auth.guard'



const routes: Routes = [
    { path: 'assessment-parameter', component: AssessmentParameterComponent, canActivate: [AuthGuard] },
    { path: 'assessment-parameter/add', component: AddAssessmentParameterComponent, canActivate: [AuthGuard] },
    { path: 'assessment-parameter/edit/:parameter_id', component: EditAssessmentParameterComponent, canActivate: [AuthGuard] },
    
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);