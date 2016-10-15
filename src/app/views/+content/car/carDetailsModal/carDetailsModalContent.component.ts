import { Component } from '@angular/core';

import { CarService } from '../../../../services/car/car.service';

@Component({
    moduleId: module.id,
    selector: 'car-details-content',
    templateUrl: 'carDetailsModalContent.component.html',
})

export class CarDetailsModalContentComponent {
    constructor(private carService: CarService) { }

    userCar: any;

    ngOnInit() {
        this.userCar = this.carService.selectedCar.info;
    }
}