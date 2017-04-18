import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CarService, ProfileService, FollowService, TimelineService } from '../../../../services';

@Component({
    selector: 'car-owner',
    styleUrls: ['./carOwner.component.scss'],
    templateUrl: './carOwner.component.html'
})

export class CarOwnerComponent implements OnInit, OnDestroy {
    public user;
    public car;
    public carLoading: boolean = true;
    public followers: number = 0;
    public following: number = 0;
    public isFollowing: boolean = false;
    public timeline: any = { postsCount: 0, mediaCount: 0 };
    private route$: Subscription;

    constructor(
        private carService: CarService,
        private profileService: ProfileService,
        private followService: FollowService,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.route$ = this.route.params.subscribe(params => {
            const route = params['id'];
            this.car = this.carService.getCarByRoute(route);
            this.carLoading = true;

            // Can detect if userCar just after we get all the cars
            this.carService.getCars().subscribe(
                userCars => this.initCar(route, userCars),
                error => this.initCar(route, null)
            );

            const actor = {
                actorId: this.car.id,
                actorType: 'car'
            };
            this.timelineService.getTimelineData(actor).subscribe(timeline => this.timeline = timeline);
        });
    }

    ngOnDestroy() {
        this.route$.unsubscribe();
    }

    public clickFollow() {
        this.followService.followCar(this.car.id).subscribe(data => {
            this.isFollowing = true;
        });
    }

    public clickUnFollow() {
        this.followService.unFollowCar(this.car.id).subscribe(data => {
            this.isFollowing = false;
        });
    }

    public clickChangePhoto(file: any) {
        if (!this.car.isUserCar) {
            return;
        }

        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.carService.uploadProfileImage(this.car.id, file).subscribe();

            this.car.info.image = e.target.result;

            this.changeDetector.detectChanges();
        }
        reader.readAsDataURL(file);
    }

    private initCar(route, userCars) {
        this.setCarInfos(userCars);

        // Set Follow info
        this.followService.getActorFollowers('car', this.car.id).subscribe(followers => this.followers = followers.length);
        this.followService.isUserFollowing(this.car.id).subscribe(isFollowing => this.isFollowing = isFollowing);
    }

    private setCarInfos(userCars) {
        if (this.car.isUserCar) {
            this.profileService.getProfile().delay(200).subscribe(user => {
                this.user = user;
                this.carLoading = false;
            });
        } else {
            this.profileService.getUserByCar(this.car.id).subscribe(user => {
                this.user = user;

                this.carService.getCarById(this.car.id).subscribe(car => {
                    this.car.info = car.carInfo;
                    this.carLoading = false;
                });
            });
        }
    }
}