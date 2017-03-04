import { NgModule } from '@angular/core';

import { routing }  from './car.routing';
import { SharedModule } from '../../../shared/shared.module';

import { CarComponent } from './car.component';
import { RegNumberPipe } from './addPost/regNumber.pipe';
import { HoverAddDirective } from './addPost/hoverAdd.directive';
import { AddPostComponent } from './addPost/addPost.component';
import { CarNavigationComponent } from './carNavigation/carNavigation.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TechSpecComponent } from './techSpec/techSpec.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        CarComponent,
        RegNumberPipe,
        HoverAddDirective,
        AddPostComponent,
        CarNavigationComponent,
        ShowcaseComponent,
        TechSpecComponent
    ]
})

export class CarModule {}

