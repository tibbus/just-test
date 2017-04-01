﻿import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService, TimelineService, PostService } from '../../services/index';
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
    public posts: any[] = [];
    public modalName: string;
    private posts$: Subscription;
    private route$: Subscription;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (this.isFeed) {
            this.posts$ = this.getPosts();

            return;
        }

        this.route$ = this.route.parent.params.subscribe(params => {
            // @TODO remove this when ready
            // Angular doesn't re-render the views when the parent route is not changed
            // therefore the subscriptions cannot be removed on `ngOnDestroy`
            this.posts$ ? this.posts$.unsubscribe() : null;

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
        this.route$ ? this.route$.unsubscribe() : null;
        this.posts$ ? this.posts$.unsubscribe() : null;
    }

    private getPosts() {
        return this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
                this.posts = posts
            }
        );
    }
}