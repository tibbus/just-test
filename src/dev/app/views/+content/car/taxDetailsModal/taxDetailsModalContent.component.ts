import { Component } from '@angular/core';

import { CarService } from '../../../../services/car/car.service';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/views/+content/car/taxDetailsModal/taxDetailsModalContent.component.html',
})

export class TaxDetailsModalContentComponent {
    constructor(private carService: CarService) { }

    carTax: any;

    ngOnInit() {
        this.carTax = this.carService.selectedCarTax;
    }
}