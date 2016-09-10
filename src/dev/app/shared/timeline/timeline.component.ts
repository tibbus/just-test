import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService } from '../../services/index';

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
    EditModalComponent: any = EditModalContentComponent;
    ImageModalComponent: any = ImageModalContentComponent;
    private modalSubscription: Subscription;
    posts: any[];
    loading: string;
    modalName: string;
    selectedPostId: string;

    constructor(
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private postService: PostService
    ) {
        //super(statusService, modalService, ref, timelineService);

        // on modal open/close :
        this.modalSubscription = modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                // open the modal
                jQuery('#myModal').modal('show');
            });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }

    ngOnInit() {
        this.timelineService.getPosts(true).subscribe(
            (posts: any) => {
                this.posts = posts;
            }
        );
    }

    onClickDelete(postId: string) {
        this.loading = postId;

        this.postService.deletePost(postId).delay(500).subscribe(
            posts => {
                // update the status list (make a new server request in the service)
                this.timelineService.getPosts(true);
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
        //this.timelineService.selectedPostId = postId;

        const post = this.timelineService.getPostById(postId);
        const postData = post.details;
        let imageUrl: string = null;

        if (post.type === 'Image') {
            imageUrl = postData.contentUris[0];
        } else {
            imageUrl = 'https://amiladevapiaccount.blob.core.windows.net/carinfoid31/Image/03072016/6df34b18-f88a-4107-a63c-8a24ad5d463c/car2.JPG';
        }

        FB.ui({
            method: 'feed',
            name: postData.description,
            description: "",
            picture: imageUrl
        }, function (response) {
            console.log(response);
        });
    }
}