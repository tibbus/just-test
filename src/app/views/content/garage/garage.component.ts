import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarService, FollowService, ModalService, ProfileService, AuthService } from '../../../services/index';
import { AddCarModalComponent } from './addCarModal/addCarModal.component';

@Component({
    selector: 'all-cars',
    styleUrls: ['./garage.component.scss'],
    templateUrl: './garage.component.html'
})

export class GarageComponent implements OnInit {
    public cars: any[] = [];
    public loading: boolean = false;
    public requestState: boolean = false;
    public alertMessage: string;
    public user;

    public AddCarModalContent: any = AddCarModalComponent;
    private modalSubscription;
    public modal;
    public followers = {};
    public ownerFollowing: number = 0;

    constructor(
        private carService: CarService,
        private modalService: ModalService,
        private followService: FollowService,
        private changeDetector: ChangeDetectorRef,
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const userId = params.id;

            this.setData(userId);
        });

        this.modalService.getModalClose().subscribe(() => {
            // close modal
            this.modal = '';
        });

        this.carService.getAddCar().subscribe(() => {
            this.getCars(true);
        });
    }

    private setData(userId) {
        const loggedUser = this.authService.getUser();

        // Check if it's current user Garage
        if (loggedUser && userId === loggedUser.profile.id) {
            this.profileService.getProfile().subscribe(user => {
                this.user = user;
                this.getCars(false);
            });
        } else {
            this.profileService.getUserById(userId).subscribe(user => {
                this.user = user;
                this.getUserCars(userId);
            });
        }

        this.followService.getActorFollowing('user', userId).subscribe(following => this.ownerFollowing = following.length);
    }

    private getCars(refreshRequest: boolean) {
        this.carService.getCars(refreshRequest).subscribe(this.setCars);
    }

    private getUserCars(userId) {
        this.carService.getUserCars(userId).subscribe(this.setCars);
    }

    private setCars = cars => {
        this.cars = cars;

        //get the followers number for each car
        this.cars.forEach(car => {
            const carFollowersObservable = this.followService.getActorFollowers('car', car.id);

            carFollowersObservable.subscribe((followers: any[]) => {
                this.followers[car.id] = followers.length;
            });
        });
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