import {Component} from 'angular2/core';
import {CarService} from '../../../../../../services/car/car.service';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/views/content/car/status/taxDetailsModal/content/content.component.html',
})

export class ContentComponent {
    constructor(private _carService: CarService) { }

    carTax: any;

    ngOnInit() {
        this.carTax = this._carService.selectedCarTax;
    }
}