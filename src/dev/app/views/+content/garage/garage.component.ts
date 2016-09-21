import { Component, OnInit } from '@angular/core';

import { CarService, SidebarService, FollowService } from '../../../services/index';

@Component({
    selector: 'all-cars',
    styleUrls: ['src/dist/app/views/+content/garage/garage.component.css'],
    templateUrl: 'src/dev/app/views/+content/garage/garage.component.html'
})

export class GarageComponent implements OnInit {
    cars: any;
    regNumber: string;
    loading: boolean = false;
    requestState: boolean = false;
    alertMessage: string;

    constructor(private carService: CarService, private sidebarService: SidebarService, private followService: FollowService) { }

    ngOnInit() {
        this.sidebarService.updateSelectedCarMenu('garage');
        this.followService.isFollowEnable$.next(false);

        this.getCars();
    }

    getCars() {
        this.carService.getCars().delay(500).subscribe(
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
                this.alertMessage = `The car with the registration number: ${this.regNumber} was succesufully added to your garage !`;

                // update the car list (make a new server request in the service)
                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    clickRemove(userCarId) {
        this.loading = true;

        this.carService.removeCar(userCarId)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertMessage = `The car was successfully removed from your garage !`;

                // update the car list (make a new server request in the service)
                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    // @Output : reset the message on alert Close
    resetAlertMessage() {
        this.alertMessage = null;
    }

    handleError(error: Error) {
        this.requestState = false;

        this.loading = false;

        this.alertMessage = 'Sorry, the request failed.';

        console.log(error);
    }
}