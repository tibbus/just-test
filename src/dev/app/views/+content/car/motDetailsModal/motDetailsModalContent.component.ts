import { Component } from '@angular/core';

import { CarService } from '../../../../services/car/car.service';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/views/+content/car/motDetailsModal/motDetailsModalContent.component.html',
})

export class MotDetailsModalContentComponent {
    constructor(private carService: CarService) { }

    carMotList: any;

    ngOnInit() {
        this.carMotList = this.carService.selectedCarMot;
    }
}