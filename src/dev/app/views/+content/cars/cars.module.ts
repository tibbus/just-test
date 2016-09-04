import { NgModule } from '@angular/core';

import { routing }  from './cars.routing';
import { SharedModule } from '../../../components/shared.module';

import { GarageComponent } from './garage/garage.component';
import { CarComponent } from '../cars/car/car.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [GarageComponent, CarComponent],
})

export class CarsModule { }

