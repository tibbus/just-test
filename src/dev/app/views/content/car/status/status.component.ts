import { Component, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../../../common/modal/modal.service';
import { VideoModalComponent } from './videoModal/videoModal.component';
import { MilestoneModalComponent } from './milestoneModal/milestoneModal.component';
import { CarDetailsModalComponent } from './carDetailsModal/carDetailsModal.component';
import { TaxDetailsModalComponent } from './taxDetailsModal/taxDetailsModal.component';
import { MotDetailsModalComponent } from './motDetailsModal/motDetailsModal.component';
import { CarService } from '../../../../services/car/car.service';
import { RegNumberPipe } from './regNumber.pipe';
import { Subscription }    from 'rxjs/Subscription';

@Component({
    selector: 'status',
    styleUrls: ['src/dist/app/views/content/car/status/status.component.css'],
    templateUrl: 'src/dev/app/views/content/car/status/status.component.html',
    directives: [VideoModalComponent, MilestoneModalComponent, CarDetailsModalComponent, TaxDetailsModalComponent, MotDetailsModalComponent],
    pipes: [RegNumberPipe]
})

export class StatusComponent {
    private modalSubscription: Subscription;

    constructor(private modalService: ModalService, private ref: ChangeDetectorRef, private _carService: CarService) {
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
    }
}