import {Component} from 'angular2/core';
import {StatusComponent} from './status/status.component';
import {WallComponent} from './wall/wall.component';
import {CarService} from '../../../services/car/car.service';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/views/content/car/car.component.css'],
    templateUrl: 'src/dev/app/views/content/car/car.component.html',
    directives: [StatusComponent, WallComponent, ROUTER_DIRECTIVES]
})

export class CarComponent {
    constructor(private _carService: CarService, private _router: Router) { }

    carLoaded: boolean = false;

    ngOnInit() {
        this._carService.getCars().delay(150).subscribe(
            (cars) => {
                if (!this._carService.selectedCar) {
                    this._router.navigate(['NotFound']);

                    return;
                }
                
                this.carLoaded = true;
        });
    }
}