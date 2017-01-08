import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { API } from '../api/api';
import { Actor } from '../stream/stream.model';
import { StreamService } from '../stream/stream.service';

@Injectable()
export class FollowService  {
    private following$ = new Subject();
    private followState$ = new Subject();
    private followings: any[];
    private actor: Actor;

    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private streamService: StreamService
    ) {
        this.actor = {
            actorType: 'user',
            actorId: this.apiService.getUserId()
        };
     }

    public requestUserFollowing$() {
        return this.streamService.getUserFollowing$(this.actor).do((followings: any[]) => {
            this.followings = followings;

            this.handleFollow();
        })
    }

    public followCar() {
        return this.http.request(this.apiService.getFollowUrl(this.carService.selectedCar.id), {
            body: '',
            method: 'POST'
        }).do(data => {
            // Update the followers list
            this.requestUserFollowing$().subscribe();
        })
    }

    public unFollowCar() {
        return this.http.request(this.apiService.getUnFollowUrl(this.carService.selectedCar.id), {
            body: '',
            method: 'POST'
        }).do(data => {
            // Update the followers list
            this.requestUserFollowing$().subscribe();
        })
    }

    public handleFollow() {
        const isFollowing = _.find(this.followings, (following: any) => {
            return following.target_id.split('car:')[1] == this.carService.selectedCar.id;
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