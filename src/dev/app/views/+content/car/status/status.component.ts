import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

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
    pipes: [RegNumberPipe],
    providers: [StatusService]
})

export class StatusComponent {
    private modalSubscription: Subscription;
    currentStatus: string;
    loading: boolean = true;

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

    modalName: string;
    carMake: string;
    carRegNumber: string;

    onMenuClick(modalName: string) {
        this.modalName = modalName;
    }

    ngOnInit() {
        this.carMake = this._carService.selectedCar.Car.Make;
        this.carRegNumber = this._carService.selectedCar.RegistrationNumber.toUpperCase();

        this.loading = true;

        this.statusService.getStatus().subscribe(
            status => {
                this.loading = false;

                this.currentStatus = status.Description;
                console.log(status);
            },
            error => this.handleError(error)
        );
    }

    onClickSave() {
        this.loading = true;

        this.statusService.updateStatus(this.currentStatus).subscribe(
            res => {
                this.loading = false;
            },
            error => this.handleError(error)
        );
    }

    handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}