import { NgModule }            from '@angular/core';

import { AlertComponent } from '../../../components/alert/alert.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { GarageComponent } from './garage.component';

@NgModule({
    imports: [],
    providers: [],
    declarations: [
        AlertComponent, LoadingComponent, GarageComponent
    ],
    exports: [GarageComponent],
})

export class GarageModule {
}