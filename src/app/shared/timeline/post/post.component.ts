import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, LikesService } from '../../../services/index';

declare var FB: any;

@Component({
    selector: 'post',
    styleUrls: ['./post.component.scss'],
    templateUrl: './post.component.html'
})

export class PostComponent {
    @Input() post: any;
    public loading: boolean;

    constructor(
        private modalService: ModalService,
        private timelineService: TimelineService,
        private postService: PostService,
        private likesService: LikesService
    ) {}

    public clickDelete(postId: string) {
        this.loading = true;

        this.postService.deletePost(postId).subscribe(
            posts => {
                // update the status list (make a new server request in the service)
                this.timelineService.getPosts();
            }
        )
    }

    public clickEdit(post: any) {
        this.timelineService.setSelectedPostId(post.activityData.id);

        // open Edit Modal
        this.modalService.setModalName$('editModal');
    }

    public clickImage(postId: string, index: number) {
        this.timelineService.setSelectedPostId(postId);
        this.timelineService.setSelectedImage(index);

        this.modalService.setModalName$('imageModal');
    }

    public clickShare(postId: string) {
        const post = this.timelineService.getPostById(postId);
        let imageUrl: string = null;

        if (post.type === 'Image') {
            imageUrl = post.activityData.contentUris[0];
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

    public clickLike(post: any) {
        // get the likes for all the posts and map them again to posts Object
        this.likesService.likePost(post.activityData.id, 'timeline', post.likes).subscribe();
    }
}