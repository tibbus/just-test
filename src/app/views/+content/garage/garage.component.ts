import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CarService, SidebarService, FollowService } from '../../../services/index';

@Component({
    moduleId: module.id,
    selector: 'all-cars',
    styleUrls: ['garage.component.css'],
    templateUrl: 'garage.component.html'
})

export class GarageComponent implements OnInit {
    public cars: any;
    public regNumber: string;
    public loading: boolean = false;
    public requestState: boolean = false;
    public alertMessage: string;
    public carDetails;

    constructor(
        private carService: CarService,
        private sidebarService: SidebarService,
        private followService: FollowService,
        private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.sidebarService.setCarMenu$('garage');
        this.followService.setFollowState(false);

        this.getCars(false);
    }

    private getCars(refreshRequest: boolean) {
        this.carService.getCars(refreshRequest).subscribe(
            cars => {
                this.cars = cars;
            },
            error => this.handleError(error)
        );
    }

    public changeRegNumber(value: string) {
        this.regNumber = value;
    }

    public clickSearchCar() {
        this.carService.searchCarByRegNumber(this.regNumber)
            .subscribe(
            (car) => {
                this.carDetails = car;
            },
            error => this.handleError(error));
    }

    public clickAddCar() {
        this.loading = true;

        this.carService.addCar(this.carDetails.id).subscribe(data => { console.log(data);
            this.loading = false;
            this.requestState = true;
            this.alertMessage = `The car with the registration number: ${this.regNumber} was succesufully added to your garage !`;
            this.regNumber = null;
            this.carDetails = null;

            // update the car list (make a new server request in the service)
            this.getCars(true);
        })
    }

    public clickRemove(userCarId) {
        this.loading = true;

        this.carService.removeCar(userCarId)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertMessage = `The car was successfully removed from your garage !`;

                // update the car list (make a new server request in the service)
                this.getCars(true);
            },
            error => this.handleError(error));
    }

    // @Output : reset the message on alert Close
    private resetAlertMessage() {
        this.alertMessage = null;
    }

    private handleError(error: any) {
        if (error.statusText === 'Not Found') {
            this.loading = false;

            return;
        }

        this.requestState = false;
        this.loading = false;
        this.alertMessage = 'Sorry, the request failed.';

        console.log(error);
    }

    public clickAddPicture(file: any, index: number) {
        if (!file) {
            return false;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.cars[index].info.image = e.target.result;
            this.cars[index].info.pictureData = file;
            this.cars[index].pictureChanged = true;
        }
        reader.readAsDataURL(file);
    }

    public clickUploadPicture(car: any) {
        car.loading = true;

        this.carService.uploadProfileImage(car).subscribe(response => {
            car.loading = false;
            car.pictureChanged = false;
        });
    }
}