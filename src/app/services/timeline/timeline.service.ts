import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

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

    private posts: any[];
    private selectedPostId: string;
    private selectedImageIndex: number;
    private posts$: any = new Subject();
    public actor: Actor;
    private images: any[];
    private streamData$;

    public getPosts(actor) {
        // Remove subscribtion to avoid sub loop
        if (this.streamData$) {
            this.streamData$.unsubscribe();
        }

        this.streamData$ = this.streamService.getData(actor, 'get').do((posts: any[]) => {
            return this.posts = posts;
        }).subscribe(posts => {
            this.posts$.next(posts);
        });

        return this.posts$;
    }

    public getTimeline(actor) {
        const timelineData$ = new Subject();

        this.getPosts(actor).subscribe(posts => {
            const carName = this.carService.getCarName(posts[0].carData.make, posts[0].carData.model);
            const timelineData: any = {
                postsCount: posts.length,
                mediaCount: null,
                carName,
                images: [],
                videos: [],
                docs: [],
                posts: posts
            };

            posts.forEach(item => {
                if (item.type === 'Image') {
                    timelineData.images = timelineData.images.concat(item.activityData.contentUris)
                } else if (item.type === 'Video') {
                    timelineData.videos = timelineData.videos.concat(item.activityData.contentUris)
                } else if (item.type === 'Document') {
                    timelineData.docs = timelineData.docs.concat(item.activityData.contentUris)
                }
            });
            timelineData.mediaCount = timelineData.images.length + timelineData.videos.length;

            timelineData$.next(timelineData);
        });

        return timelineData$;
    }

    public getOverview(actor) {
        const timeline$ = new Subject();

        this.getPosts(actor).subscribe(posts => {
            const overview: any = {
                images: [],
                videos: [],
                posts: posts.slice(0, 2)
            };

            const featuredPosts = posts.sort((current, next) => {
                const currentSocialScore = current.socialData.commentsCount + current.socialData.likesCount;
                const nextSocialScore = next.socialData.commentsCount + next.socialData.likesCount;

                return currentSocialScore < nextSocialScore;
            });

            for (let post of featuredPosts) {
                if (overview.images.length + overview.videos.length >= 4) {
                    break;
                }

                if (post.type === 'Image') {
                    overview.images = overview.images.concat(post.activityData.contentUris);

                    const featuredCount = overview.images.length + overview.videos.length;
                    if (featuredCount > 4) {
                        const overFeaturedCount = featuredCount - 4;
                        overview.images = overview.images.slice(0, -overFeaturedCount);
                    }
                } else if (post.type === 'Video') {
                    overview.videos = overview.videos.concat(post.activityData.contentUris)

                    const featuredCount = overview.images.length + overview.videos.length;
                    if (featuredCount > 4) {
                        const overFeaturedCount = featuredCount - 4;
                        overview.videos = overview.videos.slice(0, -overFeaturedCount);
                    }
                }
            }

            timeline$.next(overview);
        });

        return timeline$;
    }

    public updateAfterDelete(postId: string) {
        this.posts = this.posts.filter((post: any) => {
            return post.activityData.id !== postId
        });

        this.posts$.next(this.posts);
    }

    public updateAfterPost(post, car, postType) {
        // format the word to start with CAPITAL letter
        const formattedPostType = postType[0].toUpperCase() + postType.substr(1);

        const formattedPost = {
            activityData: post,
            carData: {
                image: car.info.image,
                make: car.info.car.make,
                model: car.info.car.model
            },
            socialData: {
                commentsCount: 0,
                likesCount: 0
            },
            likes: {
                count: 0,
                isCurrentUserLike: false,
                list: []
            },
            type: formattedPostType,
            comments: {},
            socialDataRequested: true
        }
        this.posts.unshift(formattedPost);

        this.posts$.next(this.posts);
    }

    public updateAfterEdit(newPost, oldPost) {
        oldPost.activityData = newPost;
        oldPost.socialDataRequested = true;

        this.posts = this.posts.map(post => {
            if (newPost.id === post.activityData.id) {
                return oldPost;
            }

            return post;
        });

        this.posts$.next(this.posts);
    }

    public getPostById(id: string): any {
        return this.posts.find(post => {
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