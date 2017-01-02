import { Component } from '@angular/core';

import { CarService } from '../../../../services/car/car.service';

@Component({
    //moduleId: module.id,
    selector: 'content',
    templateUrl: './taxDetailsModalContent.component.html',
})

export class TaxDetailsModalContentComponent {
    constructor(private carService: CarService) { }

    carTax: any;

    ngOnInit() {
        this.carTax = this.carService.getSelectedCarTax();
    }
}