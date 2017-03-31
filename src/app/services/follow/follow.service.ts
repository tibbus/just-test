import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { API } from '../api/api';
import { Actor } from '../stream/stream.model';
import { StreamService } from '../stream/stream.service';

@Injectable()
export class FollowService  {
    private following$ = new Subject();
    private followState$ = new Subject();
    private followings: any[] = [];
    private actor: Actor;

    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private streamService: StreamService
    ) { }

    public requestUserFollowing() {
        const actor: Actor = {
            actorType: 'user',
            actorId: this.apiService.getUserId()
        };

        return this.streamService.getUserFollowing(actor).do((followings: any[]) => {
            this.followings = followings;

            this.handleFollow();
        })
    }

    public getCarFollowers(carId: string) {
        const actor: Actor = {
            actorType: 'car',
            actorId: carId
        };

        return this.streamService.getCarFollowers(actor);
    }

    public followCar() {
        const car = this.carService.getCar();

        return this.http.request(this.apiService.getFollowUrl(car.id), {
            body: '',
            method: 'POST'
        }).do(data => {
            // Update the followers list
            this.requestUserFollowing().subscribe();
        })
    }

    public unFollowCar() {
        const car = this.carService.getCar();

        return this.http.request(this.apiService.getUnFollowUrl(car.id), {
            body: '',
            method: 'POST'
        }).do(data => {
            // Update the followers list
            this.requestUserFollowing().subscribe();
        })
    }

    public handleFollow() {
        const car = this.carService.getCar();

        const isFollowing = this.followings.find(following => {
            return following.target_id.split('car:')[1] == car.id;
        })

        this.following$.next(isFollowing ? true : false);
    }

    public isUserFollowing$() {
        return this.following$;
    }

    public getFollowState$() {
        return this.followState$;
    }

    public setFollowState(state: boolean) {
        this.followState$.next(state);
    }
}