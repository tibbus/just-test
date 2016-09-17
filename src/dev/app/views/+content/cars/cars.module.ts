import { NgModule } from '@angular/core';

import { routing }  from './cars.routing';
import { SharedModule } from '../../../shared/shared.module';

import { GarageComponent } from './garage/garage.component';
import { CarComponent } from '../cars/car/car.component';
import { RegNumberPipe } from './car/addPost/regNumber.pipe';
import { AddPostComponent } from './car/addPost/addPost.component';

import { EditModalContentComponent } from '../../../shared/timeline/editModal/editModalContent.component';
import { ImageModalContentComponent } from '../../../shared/timeline/imageModal/imageModalContent.component';
import { CarDetailsModalContentComponent } from './car/carDetailsModal/carDetailsModalContent.component';
import { MotDetailsModalContentComponent } from './car/motDetailsModal/motDetailsModalContent.component';
import { TaxDetailsModalContentComponent } from './car/taxDetailsModal/taxDetailsModalContent.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        GarageComponent,
        CarComponent,
        RegNumberPipe,
        AddPostComponent,

        EditModalContentComponent,
        ImageModalContentComponent,
        CarDetailsModalContentComponent,
        MotDetailsModalContentComponent,
        TaxDetailsModalContentComponent
    ],
    entryComponents: [
        EditModalContentComponent,
        ImageModalContentComponent,
        CarDetailsModalContentComponent,
        MotDetailsModalContentComponent,
        TaxDetailsModalContentComponent
    ]
})

export class CarsModule {}

