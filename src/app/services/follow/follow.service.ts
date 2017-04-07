import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { API } from '../api/api';
import { Actor } from '../stream/stream.model';
import { StreamService } from '../stream/stream.service';

@Injectable()
export class FollowService {
    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private streamService: StreamService
    ) { }

    public getActorFollowers(actorType: string, actorId: string): Subject<any[]> {
        const actor: Actor = {
            actorType,
            actorId
        };

        return this.streamService.getCarFollowers(actor);
    }

    public getActorFollowing(actorType: string, actorId: string): Subject<any[]> {
        const actor: Actor = {
            actorType,
            actorId
        };

        return this.streamService.getActorFollowing(actor);
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
        const following$: Subject<boolean> = new Subject();

        this.requestUserFollowing(carId, following$);

        return following$;
    }

    private requestUserFollowing(carId: string, following$: Subject<boolean>) {
        const userId = this.apiService.getUserId();

        this.getActorFollowing('user', userId).subscribe((followers: any[]) => {
            const follower = followers.find(follower => follower.target_id.split(':')[1] == carId);

            following$.next(!!follower);
        })
    }
}