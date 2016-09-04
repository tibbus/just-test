import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ProfileComponent,
    NotFoundComponent,
    //FeedComponent
} from './views/+content/index';

const appRoutes: Routes = [
    { path: '', redirectTo: '/cars', pathMatch: 'full' },
    { path: 'cars', loadChildren: 'app/app/views/+content/cars/cars.module#CarsModule' },
    { path: 'profile', component: ProfileComponent },
    //{ path: 'car/:id', component: CarComponent },
    //{ path: 'feed', component: FeedComponent },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);