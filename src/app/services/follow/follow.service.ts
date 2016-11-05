import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API } from '../index';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class FollowService  {
    private posts$ = new Subject();
    public following$ = new Subject();
    public isFollowEnable$ = new Subject();
    posts;

    constructor(private http: Http, private apiService: ApiService, private carService: CarService) { }

    followCar() {
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

    unFollowCar() {
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

    getPosts() {
        // get the token for getStream timeline call
        this.getToken().subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed('user', this.apiService.getUserId(), token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar.get({ limit: 20 }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                this.handlePostsRequest(data);
            })
        })

        return this.posts$;
    }

    getToken() {
        return this.http.request(this.apiService.getTokenUrl(), {
            body: {
                actorType: 'user',
                actorId: this.apiService.getUserId()   
            },
            method: 'POST'
        })
            .map((res: any) => {
                return res.json().token;
            });
    }

    handlePostsRequest(data) {
        this.posts = data.results.map(item => {
            // format all Object keys to lowercase
            const postObject: any = _.mapKeys(item.Target, (currentItem, currentKey: string) => {
                return currentKey[0].toLowerCase() + currentKey.substr(1);
            });
            postObject.type = item.object;

            return postObject;
        });

        this.posts$.next(this.posts);
    }

    set carFollowers(carFollowers: any) {
        this.carFollowers = carFollowers;
    }

    handleFollow() {
        const car = _.find(this.posts, (car: any) => {
            return car.carInfoId == this.carService.selectedCar.id;
        })

        this.following$.next(car ? true : false);
    }
}