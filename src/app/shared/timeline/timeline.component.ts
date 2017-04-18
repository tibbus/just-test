import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService, TimelineService, PostService, CarService, AuthService } from '../../services/index';
import { Actor } from '../../services/stream/stream.model';

declare var FB: any;
declare const jQuery: any;

@Component({
    selector: 'timeline',
    styleUrls: ['./timeline.component.scss'],
    templateUrl: './timeline.component.html',
    providers: [ModalService]
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
        private route: ActivatedRoute,
        private carService: CarService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (this.isFeed) {
            const actor = {
                actorId: this.authService.getUser().id,
                actorType: 'user'
            }

            this.posts$ = this.getPosts(actor);

            return;
        }

        this.route$ = this.route.parent.params.subscribe(params => {
            // refresh timeline on route change
            this.posts = [];
            // @TODO remove this when ready
            // Angular doesn't re-render the views when the parent route is not changed
            // therefore the subscriptions cannot be removed on `ngOnDestroy`
            this.posts$ ? this.posts$.unsubscribe() : null;

            const car = this.carService.getCarByRoute(params['id']);
            const actor = {
                actorId: car.id,
                actorType: 'car'
            };

            this.posts$ = this.getPosts(actor);
        });
    }

    ngOnDestroy() {
        this.route$ ? this.route$.unsubscribe() : null;
        this.posts$ ? this.posts$.unsubscribe() : null;
    }

    private getPosts(actor) {
        return this.timelineService.getPosts(actor).subscribe(
            (posts: any[]) => {
                this.posts = posts
            }
        );
    }
}