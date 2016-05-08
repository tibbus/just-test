import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car/car.service';

@Component({
    selector: 'all-cars',
    styleUrls: ['src/dist/app/views/content/allCars/allCars.component.css'],
    templateUrl: 'src/dev/app/views/content/allCars/allCars.component.html'
})

export class AllCarsComponent implements OnInit {
    private cars: any;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.getCars();
    }

    getCars() {
        this.carService.getCars().subscribe(
            cars => {
                this.cars = cars;
            },
            error => this.handleError(error)
        );
    }

    handleError(error: Error) {
        console.log(error);
    }
}