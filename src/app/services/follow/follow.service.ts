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
    private following$: Subject<boolean> = new Subject();
    private followings: any[] = [];
    private actor: Actor;

    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private streamService: StreamService
    ) { }

    public getCarFollowers(carId: string): Subject<any[]> {
        const actor: Actor = {
            actorType: 'car',
            actorId: carId
        };

        return this.streamService.getCarFollowers(actor);
    }

    public followCar(carId: string) {
        return this.http.request(this.apiService.getFollowUrl(carId), {
            body: '',
            method: 'POST'
        });
    }

    public unFollowCar(carId: string) {
        return this.http.request(this.apiService.getUnFollowUrl(carId), {
            body: '',
            method: 'POST'
        });
    }

    public isUserFollowing(carId: string) {
        this.requestUserFollowing(carId);

        return this.following$;
    }

    private requestUserFollowing(carId: string) {
        this.getUserFollowing().subscribe((followers: any[]) => {
            const follower = followers.find(follower => follower.target_id.split(':')[1] == carId);

            this.following$.next(!!follower);
        })
    }

    private getUserFollowing() {
        const actor: Actor = {
            actorType: 'user',
            actorId: this.apiService.getUserId()
        };

        return this.streamService.getUserFollowing(actor);
    }
}