import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent, NotFoundComponent, FeedComponent } from './views/+content/index';
import { GarageComponent } from './views/+content/garage/garage.component';
import { AuthComponent } from './views/auth/auth.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'garage', pathMatch: 'full' },
    { path: 'garage', component: GarageComponent },
    { path: 'cars', loadChildren: './views/+content/car/car.module#CarModule' },
    { path: 'profile', component: ProfileComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'callback.html', component: AuthComponent },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);