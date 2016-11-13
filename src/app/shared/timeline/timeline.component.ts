import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, FollowService } from '../../services/index';
import { EditModalContentComponent } from './editModal/editModalContent.component';
import { ImageModalContentComponent } from './imageModal/imageModalContent.component';

import * as _ from 'lodash';
declare var FB: any;

@Component({
    moduleId: module.id,
    selector: 'timeline',
    styleUrls: ['timeline.component.css'],
    templateUrl: 'timeline.component.html',
    providers: [ModalService, PostService]
})

export class TimelineComponent {
    @Input() isFeed: boolean;

    public EditModalComponent: any = EditModalContentComponent;
    public ImageModalComponent: any = ImageModalContentComponent;
    private modalSubscription: Subscription;
    public posts: any[];
    public loading: string;
    public modalName: string;
    public selectedPostId: string;
    public currentCommentText: string;
    private posts$: any;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private postService: PostService,
        private followService: FollowService
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
    }

    private ngOnInit() {
        this.posts$ = this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
                this.posts = posts;

                this.followService.handleFollow();
            }
        );
    }

    private ngOnDestroy() {
        this.modalSubscription.unsubscribe();

        this.posts$.unsubscribe();
    }

    public onClickDelete(postId: string) {
        this.loading = postId;

        this.postService.deletePost(postId).delay(500).subscribe(
            posts => {
                // update the status list (make a new server request in the service)
                this.timelineService.getPosts();
            }
        )
    }

    public onClickEdit(post: any) {
        this.selectedPostId = post;
        this.timelineService.setSelectedPostId(post.id);

        this.modalService.setModalName$('editModal');
    }

    public clickImage(postId: string, index: number) {
        this.selectedPostId = postId;
        this.timelineService.setSelectedPostId(postId);
        this.timelineService.setSelectedImage(index);

        this.modalService.setModalName$('imageModal');
    }

    public onClickShare(postId: string) {
        const post = this.timelineService.getPostById(postId);
        let imageUrl: string = null;

        if (post.type === 'Image') {
            imageUrl = post.contentUris[0];
        } else {
            imageUrl = 'https://amiladevapiaccount.blob.core.windows.net/carinfoid31/Image/03072016/6df34b18-f88a-4107-a63c-8a24ad5d463c/car2.JPG';
        }

        FB.ui({
            method: 'feed',
            name: post.description,
            description: "",
            picture: imageUrl
        }, function (response) {
            console.log(response);
        });
    }

    public clickGetComments(post: any) {
        if (post.comments.state === '-') {
            post.comments.state = '+';
        } else {
            post.comments.state = '-';
        }
    }
}