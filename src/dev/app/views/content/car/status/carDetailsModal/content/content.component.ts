import {Component} from '@angular/core';
import {CarService} from '../../../../../../services/car/car.service';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/views/content/car/status/carDetailsModal/content/content.component.html',
})

export class ContentComponent {
    constructor(private _carService: CarService) { }

    userCar: any;

    ngOnInit() {
        this.userCar = this._carService.selectedCar;
    }
}