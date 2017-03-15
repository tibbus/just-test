import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, LikesService, CommentsService } from '../../../services/index';
import { ImageModalContentComponent } from '../../imageModal/imageModalContent.component';
import { EditModalContentComponent } from '../editModal/editModalContent.component';

declare var FB: any;

@Component({
    selector: 'post',
    styleUrls: ['./post.component.scss'],
    templateUrl: './post.component.html',
    providers: [
        CommentsService,
        LikesService,
        { provide: 'likesType', useValue: 'timeline' }
    ]
})

export class PostComponent {
    @Input() post: any;

    public loading: boolean;
    public ImageModalComponent: any = ImageModalContentComponent;
    public EditModalComponent: any = EditModalContentComponent;
    public modal: string;
    public likes: any[] = [];
    public isCurrentUserLike: boolean;
    public commentsCount: number;
    private postId: string;

    constructor(
        private modalService: ModalService,
        private timelineService: TimelineService,
        private postService: PostService,
        private likesService: LikesService
    ) { }

    ngOnInit() {
        this.postId = this.post.activityData.id;
        // @TODO remove this line / defensive code added for a BE bug
        this.post.carData = this.post.carData || {};

        this.modalService.getModalClose().subscribe(() => {
            this.modal = '';
        });

        this.likesService.getLikes(this.postId, this.post.socialDataRequested).subscribe((likes: any[]) => {
            this.likes = likes;
        });
    }

    // Comments Component @Output
    public setCommentsCount(commentsCount: number) {
        this.commentsCount = commentsCount;
    }

    public clickDelete() {
        this.loading = true;

        this.postService.deletePost(this.postId, this.post.activityData.carInfoId).subscribe(
            posts => {
                // update the timeline list (make a new server request in the service)
                this.timelineService.updateAfterDelete(this.postId);
            }
        )
    }

    public clickEdit() {
        this.timelineService.setSelectedPostId(this.postId);

        // open modal
        this.modal = 'editModal';
    }

    public clickImage(index: number) {
        this.timelineService.setSelectedPostId(this.postId);
        this.timelineService.setImages(this.post.activityData.contentUris);
        this.timelineService.setSelectedImage(index);

        // open modal
        this.modal = 'imageModal';
    }

    public clickShare() {
        const post = this.timelineService.getPostById(this.postId);
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

    public clickGetComments() {
        if (this.post.comments.state === '-') {
            this.post.comments.state = '+';
        } else {
            this.post.comments.state = '-';
        }
    }

    public clickLike() {
        this.likesService.likePost(this.postId).subscribe();
    }
}