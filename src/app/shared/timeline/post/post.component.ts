import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, LikesService } from '../../../services/index';
import { ImageModalContentComponent } from '../../imageModal/imageModalContent.component';
import { EditModalContentComponent } from '../editModal/editModalContent.component';

declare var FB: any;

@Component({
    selector: 'post',
    styleUrls: ['./post.component.scss'],
    templateUrl: './post.component.html'
})

export class PostComponent {
    @Input() post: any;
    public loading: boolean;
    public ImageModalComponent: any = ImageModalContentComponent;
    public EditModalComponent: any = EditModalContentComponent;
    public modal: string;

    constructor(
        private modalService: ModalService,
        private timelineService: TimelineService,
        private postService: PostService,
        private likesService: LikesService
    ) { }

    ngOnInit() {
        // @TODO remove this line / defensive code added for a BE bug
        this.post.carData = this.post.carData || {};

        this.modalService.getModalClose().subscribe(() => {
            this.modal = '';
        });
    }

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

        // open modal
        this.modal = 'editModal';
    }

    public clickImage(postId: string, index: number) {
        this.timelineService.setSelectedPostId(postId);
        this.timelineService.setImages(this.post.activityData.contentUris);
        this.timelineService.setSelectedImage(index);

        // open modal
        this.modal = 'imageModal';
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