import { NgModule } from '@angular/core';

import { routing }  from './car.routing';
import { SharedModule } from '../../../shared/shared.module';

import { CarComponent } from './car.component';
import { RegNumberPipe } from './addPost/regNumber.pipe';
import { HoverAddDirective } from './addPost/hoverAdd.directive';
import { AddPostComponent } from './addPost/addPost.component';

import { EditModalContentComponent } from '../../../shared/timeline/editModal/editModalContent.component';
import { ImageModalContentComponent } from '../../../shared/timeline/imageModal/imageModalContent.component';
import { CarDetailsModalContentComponent } from './carDetailsModal/carDetailsModalContent.component';
import { MotDetailsModalContentComponent } from './motDetailsModal/motDetailsModalContent.component';
import { TaxDetailsModalContentComponent } from './taxDetailsModal/taxDetailsModalContent.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        CarComponent,
        RegNumberPipe,
        HoverAddDirective,
        AddPostComponent,
        EditModalContentComponent,
        CarDetailsModalContentComponent,
        MotDetailsModalContentComponent,
        TaxDetailsModalContentComponent
    ],
    entryComponents: [
        EditModalContentComponent,
        CarDetailsModalContentComponent,
        MotDetailsModalContentComponent,
        TaxDetailsModalContentComponent
    ]
})

export class CarModule {}

