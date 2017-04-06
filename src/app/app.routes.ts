import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent, NotFoundComponent, FeedComponent, GarageComponent } from './views/content/index';
import { AuthCallbackComponent } from './views/authCallback/authCallback.component';
import { LoginComponent } from './views/login/login.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'garage/:id', component: GarageComponent },
    { path: 'cars', loadChildren: './views/content/+car/car.module#CarModule' },
    { path: 'profile', component: ProfileComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'callback.html', component: AuthCallbackComponent },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);