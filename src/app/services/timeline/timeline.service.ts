import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { ApiService, CarService, API, HttpService, Actor } from '../index';
import { StreamService } from '../stream/stream.service';
import { Timeline, Post } from './timeline';

@Injectable()
export class TimelineService {
    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private streamService: StreamService
    ) {}

    public posts: Post[];
    private selectedPostId: string;
    private selectedImageIndex: number;
    private posts$ = new Subject();
    public actor: Actor;

    public getPosts() {
       return this.streamService.getData(this.actor).do((posts: any[]) => {
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