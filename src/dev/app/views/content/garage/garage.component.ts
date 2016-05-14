import { Component, OnInit } from '@angular/core';

import { CarService, AlertService } from '../../../services/index';
import { AlertComponent } from '../../../common/alert/alert.component';

@Component({
    selector: 'all-cars',
    styleUrls: ['src/dist/app/views/content/garage/garage.component.css'],
    templateUrl: 'src/dev/app/views/content/garage/garage.component.html',
    directives: [AlertComponent],
    providers: [AlertService]
})

export class GarageComponent implements OnInit {
    private cars: any;
    regNumber: string;
    loading: boolean = false;
    requestState: boolean = false;
    message: string;

    constructor(private carService: CarService, private alertService: AlertService) { }

    ngOnInit() {
        this.getCars();

        this.alertService.message$.subscribe(
            (message: string) => {
                this.message = message;
            });
    }

    getCars() {
        this.carService.getCars().subscribe(
            cars => {
                this.cars = cars;
            },
            error => this.handleError(error)
        );
    }

    onKey(value: string) {
        this.regNumber = value;
    }

    onRegNumberSubmit() {
        this.loading = true;

        this.carService.addCar(this.regNumber)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertService.setMessage(`The car with the registration number: ${this.regNumber} was succesufully added to your garage !`);

                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    handleError(error: Error) {
        this.alertService.setMessage('Sorry, we failed to add the car.');

        this.loading = false;

        console.log(error);
    }
}