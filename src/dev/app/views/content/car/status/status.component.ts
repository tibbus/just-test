import {Component, ChangeDetectorRef} from 'angular2/core';
import {ModalService} from '../../../../common/modal/modal.service';
import {VideoModalComponent} from './videoModal/videoModal.component';
import {MilestoneModalComponent} from './milestoneModal/milestoneModal.component';
import {CarDetailsModalComponent} from './carDetailsModal/carDetailsModal.component';
import {TaxDetailsModalComponent} from './taxDetailsModal/taxDetailsModal.component';
import {MotDetailsModalComponent} from './motDetailsModal/motDetailsModal.component';
import {CarService} from '../../../../services/car/car.service';

@Component({
    selector: 'status',
    styleUrls: ['src/dist/app/views/content/car/status/status.component.css'],
    templateUrl: 'src/dev/app/views/content/car/status/status.component.html',
    directives: [VideoModalComponent, MilestoneModalComponent, CarDetailsModalComponent, TaxDetailsModalComponent, MotDetailsModalComponent],
    providers: [ModalService]
})

export class StatusComponent {
    constructor(private _modalService: ModalService, private ref: ChangeDetectorRef, private _carService: CarService) {
        _modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();
            })
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