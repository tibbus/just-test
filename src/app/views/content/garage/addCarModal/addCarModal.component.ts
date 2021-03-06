﻿import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, CarService, FollowService } from '../../../../services/index';

@Component({
    selector: 'content',
    templateUrl: './addCarModal.component.html',
    styleUrls: ['./addCarModal.component.scss']
})

export class AddCarModalComponent {
    private modalSaveSub: Subscription;
    public carDetails;
    public regNumber: string;
    public loading;
    public requestState;
    public alertMessage;
    private cars;
    public carAdded: boolean = false;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private carService: CarService,
        private followService: FollowService
    ) { }

    public clickSearchCar() {
        this.loading = true;
        this.carDetails = null;
        this.alertMessage = null;

        this.carService.searchCarByRegNumber(this.regNumber)
            .subscribe(
            car => {
                this.loading = false;
                this.carDetails = car;
            },
            error => this.handleError(error)
            );
    }

    public clickAddCar() {
        this.loading = true;
        this.alertMessage = null;

        this.carService.addCar(this.carDetails.id).subscribe(
            (car: any) => {
                this.loading = false;
                this.requestState = true;
                this.regNumber = null;
                this.carDetails = null;

                // update the car list (make a new server request in the service)
                this.carService.setAddCar();

                this.carAdded = true;

                this.followService.followCar(car.carInfo.id).subscribe();
            },
            error => this.handleError(error)
        );
    }

    public clickCarDone() {
        this.modalService.setModalClose();

        this.carAdded = false;
        this.alertMessage = null;
    }

    public changeRegNumber(value: string) {
        this.regNumber = value;
    }

    private getCars(refreshRequest: boolean) {
        this.carService.getCars(refreshRequest).subscribe(
            cars => {
                this.cars = cars;
            },
            error => this.handleError(error)
        );
    }

    private handleError(error: any) {
        if (error.statusText === 'Not Found') {
            this.loading = false;

            return;
        }

        this.requestState = false;
        this.loading = false;
        this.alertMessage = `We couldn't find this car.`;
    }
}