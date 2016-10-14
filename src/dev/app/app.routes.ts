import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   

import { ProfileComponent, NotFoundComponent, FeedComponent } from './views/+content/index';
import { GarageComponent } from './views/+content/garage/garage.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'garage', pathMatch: 'full' },
    { path: 'garage', component: GarageComponent },
    { path: 'cars', loadChildren: 'app/app/views/+content/car/car.module#CarModule' },
    { path: 'profile', component: ProfileComponent },
    { path: 'feed', component: FeedComponent },
    { path: '**', component: NotFoundComponent }     
]; 

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);