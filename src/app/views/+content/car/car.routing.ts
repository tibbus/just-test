import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarComponent } from './car.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TimelineComponent } from '../../../shared/timeline/timeline.component';

const routes: Routes = [
    { path: ':id', component: CarComponent,
    children: [
      { path: '', redirectTo: 'timeline', pathMatch: 'full' },
      { path: 'timeline', component: TimelineComponent },
      { path: 'showcase', component: ShowcaseComponent }
    ] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);