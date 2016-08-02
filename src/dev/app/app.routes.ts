import { provideRouter, RouterConfig }  from '@angular/router';

import {
    GarageComponent,
    CarComponent,
    ProfileComponent,
    NotFoundComponent,
    FeedComponent
} from './views/+content/index';

const routes: RouterConfig = [
    { path: '', redirectTo: '/garage', pathMatch: 'full' },
    { path: 'garage', component: GarageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'car/:id', component: CarComponent },
    { path: 'feed', component: FeedComponent },
    { path: '**', component: NotFoundComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];