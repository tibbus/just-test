import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CarService, FollowService, ModalService, ProfileService, AuthService } from '../../../services/index';
import { AddCarModalComponent } from './addCarModal/addCarModal.component';

@Component({
    selector: 'all-cars',
    styleUrls: ['./garage.component.scss'],
    templateUrl: './garage.component.html'
})

export class GarageComponent implements OnInit {
    public AddCarModalContent: any = AddCarModalComponent;
    public modal: string;
    public cars: any[] = [];
    public isLoading: boolean = true;
    public requestState: boolean = false;
    public alertMessage: string;
    public user: any;
    public follow = {};
    public ownerFollowing: number = 0;

    constructor(
        private carService: CarService,
        private modalService: ModalService,
        private followService: FollowService,
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.isLoading = true;
            const routeId: string = params.id;

            // used only for `auth`
            if (routeId === 'authentication') {
                const user = this.authService.getUser();
                this.router.navigateByUrl(`/garage/${user.route}`);

                return;
            }

            // Id is the last char after `-`
            const userId = routeId.split('-').slice(-1)[0];
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

    public clickFollow(carId: string) {
        this.followService.followCar(carId).subscribe(() => this.follow[carId].isFollowing = true);
    }

    public clickUnFollow(carId: string) {
        this.followService.unFollowCar(carId).subscribe(() => this.follow[carId].isFollowing = false);
    }

    public clickAddCar() {
        this.modal = 'addCarModal';
    }

    public clickRemove(userCarId) {
        const confirm = window.confirm("Are you sure ? This will remove the car from your profile !");

        if (!confirm) {
            return;
        }

        this.carService.removeCar(userCarId)
            .subscribe(
            () => {
                // @todo do not reload the page, update the data in SPA
                location.reload();

                this.requestState = true;
                this.alertMessage = `The car was successfully removed from your garage !`;

                // update the car list (make a new server request in the service)
                this.getCars(true);
            },
            error => this.handleError(error));
    }

    public showFollow(carId: string): boolean {
        return !this.user.isMyProfile && !this.follow[carId].isFollowing && this.authService.isUserLoggedIn();
    }

    public showUnFollow(carId: string): boolean {
        return !this.user.isMyProfile && this.follow[carId].isFollowing && this.authService.isUserLoggedIn();
    }

    public isUserAuth() {
        return this.authService.isUserAuth(this.user.id);
    }

    private setData(userId) {
        const loggedUser = this.authService.getUser();

        // Check if it's current user Garage
        if (loggedUser && userId === loggedUser.id) {
            this.profileService.getProfile().subscribe(user => {
                this.user = user;
                this.user.isMyProfile = true;

                this.getCars(false);
                this.isLoading = false;
            });
        } else {
            this.profileService.getUserById(userId).subscribe(user => {
                this.user = user;
                this.getUserCars(userId);
                this.isLoading = false;
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
            this.follow[car.id] = {
                followers: 0,
                isFollowing: false
            };
            this.followService.getActorFollowers('car', car.id)
                .subscribe((followers: any[]) => this.follow[car.id].followers = followers.length);
            this.followService.isUserFollowing(car.id)
                .subscribe(isFollowing => {
                    this.follow[car.id].isFollowing = isFollowing;
                });
        });
    }

    // @Output : reset the message on alert Close
    private resetAlertMessage() {
        this.alertMessage = null;
    }

    private handleError(error: any) {
        if (error.statusText === 'Not Found') {
            return;
        }

        this.requestState = false;
        this.alertMessage = 'Sorry, the request failed.';

        console.log(error);
    }
}