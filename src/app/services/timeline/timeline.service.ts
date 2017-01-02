import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

//import { ApiService, CarService, API, HttpService, Actor } from '../index';
import { StreamService } from '../stream/stream.service';
import { Timeline, Post } from './timeline.model';
import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { API } from '../api/api';
import { HttpService } from '../http/http.service';
import { Actor } from '../stream/stream.model';


@Injectable()
export class TimelineService {
    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private streamService: StreamService
    ) {}

    private posts: Post[];
    private selectedPostId: string;
    private selectedImageIndex: number;
    private posts$ = new Subject();
    public actor: Actor;

    public getPosts() {
       return this.streamService.getData(this.actor, 'get').do((posts: any[]) => {
            this.posts = posts.map(post => {
                const carInfoUrl: string = this.apiService.getCarInfoUrl(post.activityData.carInfoId);

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

            return this.posts;
        });
    }

    public getPostById(id: string): any {
        return _.find(this.posts, (post: any) => {
            return post.activityData.id == id;
        });
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

    public updateCommentsCount(postId: string, amount: number) {
        this.posts = this.posts.map((post: any) => {
            if (post.activityData.id == postId) {
                post.socialData.commentsCount += amount;
            }

            return post;
        })
    }
}