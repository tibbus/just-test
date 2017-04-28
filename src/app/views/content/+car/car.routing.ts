import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarComponent } from './car.component';
import { OverviewComponent } from './overview/overview.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TimelineComponent } from '../../../shared/timeline/timeline.component';
import { TechSpecComponent } from './techSpec/techSpec.component';

const routes: Routes = [
    {
      path: ':id', component: CarComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent },
            { path: 'timeline', component: TimelineComponent },
            { path: 'showcase', component: ShowcaseComponent },
            { path: 'specs', component: TechSpecComponent }
        ]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);