import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API, HttpService } from '../index';
import { Timeline, Post } from './timeline';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimelineService {
    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService
    ) {}

    public posts: Post[];
    private selectedPostId: string;
    private selectedImageIndex: number;
    private posts$ = new Subject();
    public actor: any;

    public getPosts() {
        // get the token for getStream timeline call
        this.getToken$().subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed(this.actor.actorType, this.actor.actorId, token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar.get({ limit: 20 }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                this.handlePostsRequest$(data);
            });
        });

        return this.posts$.do((posts: any[]) => {
            return posts.map(post => {
                const carInfoUrl: string = this.apiService.getCarInfoUrl(post.carInfoId);

                post.comments = {
                    state: '+'
                };

                this.http.get(carInfoUrl).map((res: any) => {
                    return res.json();
                }).subscribe(car => {
                    post.carInfo = car.carInfo.car;
                });

                return post;
            });
        });
    }

    private getToken$() {
        return this.http.request(this.apiService.getTokenUrl(), {
            body: this.actor,
            method: 'POST'
        })
            .map((res: any) => {
                return res.json().token;
            });
    }

    private handlePostsRequest$(data) {
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

    public getPostById(id: string): any {
        return _.find(this.posts, { id });
    }

    public setSelectedPostId(id: string) {
        this.selectedPostId = id;
    }

    public getSelectedPostId(): string {
        return this.selectedPostId;
    }

    public setSelectedImage(index: number) {
        this.selectedImageIndex = index;
    }

    public getSelectedImage(): number {
        return this.selectedImageIndex;
    }

    public getSelectedPost() {
        return this.getPostById(this.selectedPostId);
    }
}