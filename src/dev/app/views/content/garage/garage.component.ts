import { Component, OnInit } from '@angular/core';

import { CarService, AlertService } from '../../../services/index';
import { AlertComponent } from '../../../common/alert/alert.component';
import { LoadingComponent } from '../../../common/loading/loading.component';

@Component({
    selector: 'all-cars',
    styleUrls: ['src/dist/app/views/content/garage/garage.component.css'],
    templateUrl: 'src/dev/app/views/content/garage/garage.component.html',
    directives: [AlertComponent, LoadingComponent],
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

    changeRegNumber(value: string) {
        this.regNumber = value;
    }

    clickAddCar() {
        this.loading = true;

        this.carService.addCar(this.regNumber)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertService.setMessage(`The car with the registration number: ${this.regNumber} was succesufully added to your garage !`);

                // update the car list (make a new server request in the service)
                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    clickRemove(carId) {
        this.loading = true;

        this.carService.removeCar(carId)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertService.setMessage(`The car was successfully removed from your garage !`);

                // update the car list (make a new server request in the service)
                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    handleError(error: Error) {
        this.requestState = false;

        this.loading = false;

        this.alertService.setMessage('Sorry, the request failed.');

        console.log(error);
    }
}