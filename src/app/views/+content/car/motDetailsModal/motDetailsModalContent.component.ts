import { Component } from '@angular/core';

import { CarService } from '../../../../services/car/car.service';

@Component({
    //moduleId: module.id,
    selector: 'content',
    templateUrl: './motDetailsModalContent.component.html',
})

export class MotDetailsModalContentComponent {
    constructor(private carService: CarService) { }

    carMotList: any;

    ngOnInit() {
        this.carMotList = this.carService.getSelectedCarMot();
    }
}