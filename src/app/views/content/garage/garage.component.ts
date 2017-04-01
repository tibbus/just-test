import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CarService, FollowService, ModalService } from '../../../services/index';
import { AddCarModalComponent } from './addCarModal/addCarModal.component';

@Component({
    selector: 'all-cars',
    styleUrls: ['./garage.component.scss'],
    templateUrl: './garage.component.html'
})

export class GarageComponent implements OnInit {
    public cars: any;
    public loading: boolean = false;
    public requestState: boolean = false;
    public alertMessage: string;

    public AddCarModalContent: any = AddCarModalComponent;
    private modalSubscription;
    public modal;
    public followers = {};

    constructor(
        private carService: CarService,
        private modalService: ModalService,
        private followService: FollowService,
        private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.getCars(false);

        this.modalService.getModalClose().subscribe(() => {
            // close modal
            this.modal = '';
        });

        this.carService.getAddCar().subscribe(() => {
            this.getCars(true);
        });
    }

    private getCars(refreshRequest: boolean) {
        this.carService.getCars(refreshRequest).subscribe(
            cars => {
                this.cars = cars;

                //get the followers number for each car
                this.cars.forEach(car => {
                    const carFollowersObservable = this.followService.getCarFollowers(car.id);

                    carFollowersObservable.subscribe((followers: any[]) => {
                        this.followers[car.id] = followers.length;
                    });
                });
            },
            error => {
                this.cars = [];

                this.handleError(error);
            }
        );
    }

    public clickRemove(userCarId) {
        const confirm = window.confirm("Are you sure ? This will remove the car from your profile !");

        if (!confirm) {
            return;
        }

        this.loading = true;

        this.carService.removeCar(userCarId)
            .subscribe(
            () => {
                // @todo do not reload the page, update the data in SPA
                location.reload();

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

    public clickOpenCarModal() {
        // open Edit Modal
        this.modal = 'addCarModal';
    }
}