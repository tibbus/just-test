import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarageComponent } from './garage/garage.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
    { path: '', redirectTo: 'garage', pathMatch: 'full' },
    { path: 'garage', component: GarageComponent },
    { path: ':id', component: CarComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


//{ path: '', redirectTo: 'list', pathMatch: 'full' },
//{ path: 'list', component: CrisisListComponent },
//{ path: ':id', component: CrisisDetailComponent }