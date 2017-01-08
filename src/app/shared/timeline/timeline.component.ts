import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, FollowService, LikesService } from '../../services/index';
import { EditModalContentComponent } from './editModal/editModalContent.component';
import { ImageModalContentComponent } from './imageModal/imageModalContent.component';

declare var FB: any;
declare const jQuery: any;

@Component({
    //moduleId: module.id,
    selector: 'timeline',
    styleUrls: ['./timeline.component.scss'],
    templateUrl: './timeline.component.html',
    providers: [ModalService, PostService]
})

export class TimelineComponent implements OnInit, OnDestroy {
    @Input() isFeed: boolean;

    public EditModalComponent: any;
    public ImageModalComponent: any;
    private modalSubscription: Subscription;
    public posts: any[];
    public modalName: string;
    private posts$: any;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private followService: FollowService,
        private likesService: LikesService
    ) {
        // on modal open/close :
        this.modalSubscription = modalService.getModalName$().subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                if (modalName) {
                    // open the modal
                    jQuery('#myModal').modal('show');
                }
            });

        this.EditModalComponent = EditModalContentComponent;
        this.ImageModalComponent = ImageModalContentComponent;
    }

    ngOnInit() {
        this.posts$ = this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
                this.posts = posts;

                this.followService.handleFollow();

                this.mapLikesToPosts();
            }
        );
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();

        this.posts$.unsubscribe();
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