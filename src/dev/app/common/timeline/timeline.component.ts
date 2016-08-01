import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService } from '../../services/index';
import { LoadingComponent } from '../loading/loading.component';
import { EditModalComponent } from './editModal/editModal.component';
import { ImageModalComponent } from './imageModal/imageModal.component';
import { TimelineDatePipe } from './timelineDate.pipe';

declare var FB: any;

@Component({
    selector: 'timeline',
    styleUrls: ['src/dist/app/common/timeline/timeline.component.css'],
    templateUrl: 'src/dev/app/common/timeline/timeline.component.html',
    directives: [LoadingComponent, EditModalComponent, ImageModalComponent],
    providers: [ModalService, PostService],
    pipes: [TimelineDatePipe]
})

export class TimelineComponent {
    private modalSubscription: Subscription;

    statuses: any[];
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
            (statuses: any) => {
                this.statuses = _.filter(statuses.results.reverse(), item => {
                    if (item) {
                        return true;
                    } else {
                        return false;
                    }
                })

                this.statuses = this.statuses.map(item => {
                    const postObject = item.details;
                    postObject.type = item.type;

                    return postObject;
                });
            }
        )
    }

    onClickDelete(postId: string) {
        this.loading = postId;

        this.postService.deletePost(postId).delay(500).subscribe(
            statuses => {
                // update the status list (make a new server request in the service)
                this.timelineService.getPosts(true);
            }
        )
    }

    onClickEdit(postId: string) {
        this.selectedPostId = postId;
        this.timelineService.selectedPostId = postId;

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