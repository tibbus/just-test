import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService, TimelineService, PostService, FollowService, LikesService } from '../../services/index';
import { Actor } from '../../services/stream/stream.model';

declare var FB: any;
declare const jQuery: any;

@Component({
    selector: 'timeline',
    styleUrls: ['./timeline.component.scss'],
    templateUrl: './timeline.component.html',
    providers: [ModalService, PostService]
})

export class TimelineComponent implements OnInit, OnDestroy {
    @Input() isFeed: boolean;

    public EditModalComponent: any;
    public posts: any[];
    public modalName: string;
    private posts$: Subscription;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private followService: FollowService,
        private likesService: LikesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        if (this.isFeed) {
            this.posts$ = this.getPosts();

            return;
        }

       this.route.parent.params.subscribe(params => {
            const carRoute = params['id'];
            const parsedRoute = carRoute.split('-');
            const carId = parsedRoute[parsedRoute.length - 1];

            this.timelineService.actor = {
                actorId: carId,
                actorType: 'car'
            };

            this.posts$ = this.getPosts();
        });
    }

    ngOnDestroy() {
        this.posts$.unsubscribe();
    }

    private getPosts() {
        return this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
                this.posts = posts

                if (!this.isFeed) {
                    this.followService.handleFollow();
                }

                this.mapLikesToPosts();
            }
        );
    }

    private mapLikesToPosts() {
        // map likes to posts
        this.likesService.getPostsLikesCount(this.posts).subscribe(
            (posts: any) => {
                this.posts = posts;
                console.log(posts);
                //this.ref.detectChanges();
            }
        );
    }
}