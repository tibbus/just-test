import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, CarService } from '../../../../services/index';

@Component({
    selector: 'content',
    templateUrl: './addCarModal.component.html',
    styleUrls: ['./addCarModal.component.scss']
})

export class AddCarModalComponent implements OnInit, OnDestroy {
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
        private carService: CarService
    ) { }

    ngOnInit() {
        this.modalSaveSub = this.modalService.getModalSave().subscribe(
            () => {
                //this.savePost();
            }
        )
    }

    ngOnDestroy() {
        this.modalSaveSub.unsubscribe();
    }

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
            data => {
                console.log(data);
                this.loading = false;
                this.requestState = true;
                this.alertMessage = `The car with the registration number: ${this.regNumber} was succesufully added to your garage !`;
                this.regNumber = null;
                this.carDetails = null;

                // update the car list (make a new server request in the service)
                this.getCars(true);

                this.carAdded = true;
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
        this.alertMessage = 'Sorry, the request failed.';

        console.log(error);
    }
}