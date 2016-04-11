import {Component} from 'angular2/core';
import {CarService} from '../../../../../../services/car/car.service';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/views/content/car/status/motDetailsModal/content/content.component.html',
})

export class ContentComponent {
    constructor(private _carService: CarService) { }

    carMotList: any;

    ngOnInit() {
        this.carMotList = this._carService.selectedCarMot;
    }
}