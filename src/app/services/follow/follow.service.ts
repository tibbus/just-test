import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { ApiService, CarService, API, Actor } from '../index';
import { StreamService } from '../stream/stream.service';

@Injectable()
export class FollowService  {
    private posts$ = new Subject();
    private following$ = new Subject();
    private followState$ = new Subject();
    private posts;
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

    public getPosts() {
        return this.streamService.getData(this.actor).do(data => {
            this.posts = data;
        });
    }

    public followCar() {
        return this.http.request(this.apiService.getFollowUrl(this.carService.selectedCar.id), {
            body: '',
            method: 'POST'
        }).do(data => {
            // Update the followers list
            this.posts.push({
                carInfoId: this.carService.selectedCar.id
            });
        })
    }

    public unFollowCar() {
        return this.http.request(this.apiService.getUnFollowUrl(this.carService.selectedCar.id), {
            body: '',
            method: 'POST'
        }).do(data => {
            // Update the followers list
            this.posts = _.filter(this.posts, (car: any) => {
                // Not a strict comparison due to BE bug where some are strings some are nubmers
                return car.carInfoId != this.carService.selectedCar.id;
            });
        })
    }

    public handleFollow() {
        const car = _.find(this.posts, (car: any) => {
            return car.carInfoId == this.carService.selectedCar.id;
        })

        this.following$.next(car ? true : false);
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