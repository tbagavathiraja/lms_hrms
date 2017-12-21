import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login/:tenant_id', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);