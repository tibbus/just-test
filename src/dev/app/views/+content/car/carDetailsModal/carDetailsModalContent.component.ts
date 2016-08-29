import { Component } from '@angular/core';

import { CarService } from '../../../../services/car/car.service';

@Component({
    selector: 'car-details-content',
    templateUrl: 'src/dev/app/views/+content/car/carDetailsModal/carDetailsModalContent.component.html',
})

export class CarDetailsModalContentComponent {
    constructor(private _carService: CarService) { }

    userCar: any;

    ngOnInit() {
        this.userCar = this._carService.selectedCar;
    }
}