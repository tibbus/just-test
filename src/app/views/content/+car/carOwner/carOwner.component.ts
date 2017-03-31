import { Component, OnInit } from '@angular/core';

import { CarService, ProfileService, FollowService } from '../../../../services';

@Component({
    selector: 'car-owner',
    styleUrls: ['./carOwner.component.scss'],
    templateUrl: './carOwner.component.html'
})

export class CarOwnerComponent implements OnInit {
    public user;
    public car;
    public carLoading: boolean = true;
    public followers: number = 0;
    public isFollowing: boolean = false;

    constructor(private carService: CarService, private profileService: ProfileService, private followService: FollowService) { }

    ngOnInit() {
        this.car = this.carService.getCar();
        console.log(this.car);

        this.setUser();

        this.followService.getCarFollowers(this.car.id).subscribe((followers: any[]) => this.followers = followers.length);

        // @todo check why is this called ??
        this.followService.requestUserFollowing().subscribe();
        this.followService.isUserFollowing$().subscribe((state: boolean) => {
            this.isFollowing = state;
        })
    }

    public clickFollow() {
        this.followService.followCar().subscribe(data => {
            this.isFollowing = true;
        });
    }

    public clickUnFollow() {
        this.followService.unFollowCar().subscribe(data => {
            this.isFollowing = false;
        });
    }

    private setUser() {
        if (this.car.isUserCar) {
            this.profileService.getProfile().subscribe(user => {
                this.user = user;

                this.carService.getCars().subscribe(cars => {
                    this.user.carsCount = cars.length;

                    this.setCar(cars);
                })
            });
        } else {
            this.profileService.getUser(this.car.id).subscribe(user => {
                this.user = user;

                this.carService.getUserCars(this.user.userId).subscribe(cars => {
                    this.user.carsCount = cars.length;

                    this.setCar(cars);
                })
            });
        }
    }

    private setCar(cars) {
        const currentCar = cars.find(car => car.id == this.car.id);
        !this.car.isUserCar ? this.car.info = currentCar.carInfo : null;

        this.carLoading = false;
    }


}