import {Component} from 'angular2/core';
import {StatusComponent} from './status/status.component';
import {WallComponent} from './wall/wall.component';
import {CarService} from '../../../services/car/car.service';

@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/views/content/car/car.component.css'],
    templateUrl: 'src/dev/app/views/content/car/car.component.html',
    directives: [StatusComponent, WallComponent]
})

export class CarComponent {
    constructor(private _carService: CarService) { }

    carLoaded: boolean = false;

    ngAfterViewInit() {
        this._carService.getCars().delay(150).subscribe(
            (cars) => {
                this.carLoaded = true;
        });

        jQuery.material.init();
    }
}