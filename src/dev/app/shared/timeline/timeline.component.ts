import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, FollowService } from '../../services/index';
import { EditModalContentComponent } from './editModal/editModalContent.component';
import { ImageModalContentComponent } from './imageModal/imageModalContent.component';

import * as _ from 'lodash';
declare var FB: any;

@Component({
    selector: 'timeline',
    styleUrls: ['src/dist/app/shared/timeline/timeline.component.css'],
    templateUrl: 'src/dev/app/shared/timeline/timeline.component.html',
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

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private postService: PostService,
        private followService: FollowService
    ) {
        // on modal open/close :
        this.modalSubscription = modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                if (modalName) {
                    // open the modal
                    jQuery('#myModal').modal('show');
                }
            });
    }

    ngOnInit() {
        this.timelineService.getPosts().subscribe(
            (posts: any) => {
                this.posts = posts.map(post => {
                    post.comments = {
                        state: '+'
                    };

                    return post;
                });

                console.log(this.posts);
                this.followService.handleFollow();
            }
        );
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }

    onClickDelete(postId: string) {
        this.loading = postId;

        this.postService.deletePost(postId).delay(500).subscribe(
            posts => {
                // update the status list (make a new server request in the service)
                this.timelineService.getPosts();
            }
        )
    }

    onClickEdit(post: any) {
        this.selectedPostId = post;
        this.timelineService.selectedPostId = post.id;

        this.modalService.setModalName('editModal');
    }

    clickImage(postId: string, index: number) {
        this.selectedPostId = postId;
        this.timelineService.selectedPostId = postId;
        this.timelineService.selectedImage = index;

        this.modalService.setModalName('imageModal');
    }

    onClickShare(postId: string) {
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

    clickGetComments(post: any) {
        if (post.comments.state === '-') {
            post.comments.state = '+';
        } else {
            post.comments.state = '-';
        }
    }
}