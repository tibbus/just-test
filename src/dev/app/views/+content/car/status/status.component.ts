import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, CarService, StatusService } from '../../../../services/index';
import {
    VideoModalComponent,
    MilestoneModalComponent,
    CarDetailsModalComponent,
    TaxDetailsModalComponent,
    MotDetailsModalComponent,
    RegNumberPipe
} from './index';
import { LoadingComponent } from '../../../../common/loading/loading.component';

@Component({
    selector: 'status',
    styleUrls: ['src/dist/app/views/+content/car/status/status.component.css'],
    templateUrl: 'src/dev/app/views/+content/car/status/status.component.html',
    directives: [
        VideoModalComponent,
        MilestoneModalComponent,
        CarDetailsModalComponent,
        TaxDetailsModalComponent,
        MotDetailsModalComponent,
        LoadingComponent
    ],
    pipes: [RegNumberPipe]
})

export class StatusComponent {
    private modalSubscription: Subscription;
    currentStatus: string;
    loading: boolean = false;
    modalName: string;
    carMake: string;
    carRegNumber: string;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private _carService: CarService,
        private statusService: StatusService
    ) {
        // on modal open/close :
        this.modalSubscription = modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                // open the modal
                jQuery('#myModal').modal('show');
            });
    }
    
    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }  

    onMenuClick(modalName: string) {
        this.modalName = modalName;
    }

    ngOnInit() {
        this.carMake = this._carService.selectedCar.car.make;
        this.carRegNumber = this._carService.selectedCar.registrationNumber.toUpperCase();
    }

    clickAddStatus() {
        this.loading = true;
        console.log(this.currentStatus)

        this.statusService.addStatus(this.currentStatus).delay(1000).subscribe(
            res => {
                // clear the textarea
                this.currentStatus = null;

                console.log(res);
                this.loading = false;

                // update the status list (make a new server request in the service)
                this.statusService.getStatuses(true);
            },
            error => this.handleError(error)
        );
    }

    handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}