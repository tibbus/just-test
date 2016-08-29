import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    GarageComponent,
    CarComponent,
    ProfileComponent,
    NotFoundComponent,
    //FeedComponent
} from './views/+content/index';

const appRoutes: Routes = [
    { path: '', redirectTo: '/garage', pathMatch: 'full' },
    //{ path: 'garage', component: GarageComponent },
    { path: 'garage', component: GarageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'car/:id', component: CarComponent },
    //{ path: 'feed', component: FeedComponent },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);