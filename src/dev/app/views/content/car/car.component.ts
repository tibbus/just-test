import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { StatusComponent } from './status/status.component';
import { WallComponent } from './wall/wall.component';
import { CarService } from '../../../services/index';


@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/views/content/car/car.component.css'],
    templateUrl: 'src/dev/app/views/content/car/car.component.html',
    directives: [StatusComponent, WallComponent, ROUTER_DIRECTIVES]
})

export class CarComponent {
    constructor(private carService: CarService, private router: Router) { }

    carLoaded: boolean = false;

    ngOnInit() {
        this.carService.getCars().delay(150).subscribe(
            (cars) => {
                if (!this.carService.selectedCar) {
                    this.router.navigate(['NotFound']);

                    return;
                }
                
                this.carLoaded = true;
        });
    }
}