import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarComponent } from './car.component';

const routes: Routes = [
    { path: ':id', component: CarComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);