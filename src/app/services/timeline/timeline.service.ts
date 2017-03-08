import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { StreamService } from '../stream/stream.service';
import { Timeline, Post } from './timeline.model';
import { CarService } from '../car/car.service';
import { Actor } from '../stream/stream.model';


@Injectable()
export class TimelineService {
    constructor(
        private carService: CarService,
        private streamService: StreamService
    ) { }

    private posts: Post[];
    private selectedPostId: string;
    private selectedImageIndex: number;
    private posts$: any = new Subject();
    public actor: Actor;
    private images: any[];
    private streamData$;

    public getPosts() {
        // Remove subscribtion to avoid sub loop
        if (this.streamData$) {
            this.streamData$.unsubscribe();
        }

        this.streamData$ = this.streamService.getData(this.actor, 'get').do((posts: any[]) => {
            this.posts = posts.map(post => {
                post.comments = {
                    state: '+'
                };

                return post;
            });

            return this.posts;
        }).subscribe(posts => this.posts$.next(posts));

        return this.posts$;
    }

    public updateAfterDelete(postId: string) {
        console.log(this.posts)
        this.posts = this.posts.filter((post: any) => {
            if (!post.activityData) {
                return true;
            }

            return post.activityData.id != postId;
        });

        this.posts$.next(this.posts);
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

    public setImages(images: any[]) {
        this.images = images;
    }

    public getImages() {
        return this.images;
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