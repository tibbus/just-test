import { Component, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService, TimelineService, PostService, LikesService, CommentsService, CarService } from '../../../services/index';
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
    @HostListener('mouseenter') mouseoverComment() {
        clearTimeout(this.showOptionsTimeout);
        this.showOptions = true;
    };
    @HostListener('mouseleave') mouseleaveComment() {
        this.showOptionsTimeout = setTimeout(() => this.showOptions = false, 500);
    };

    public loading: boolean;
    public modal: any;
    public likes: any[] = [];
    public isCurrentUserLike: boolean;
    public commentsCount: number;
    public carRoute: string;
    public showOptions: boolean = false;
    private postId: string;
    private showOptionsTimeout;

    constructor(
        private modalService: ModalService,
        private timelineService: TimelineService,
        private postService: PostService,
        private likesService: LikesService,
        private carService: CarService
    ) { }

    ngOnInit() {
        this.postId = this.post.activityData.id;
        this.carRoute = this.carService.getCarRoute(this.post.carData.make, this.post.carData.model, this.post.activityData.carInfoId);

        this.modalService.getModalClose().subscribe(() => {
            this.modal = null;
        });

        this.likesService.getLikes(this.postId, this.post.socialDataRequested, this.post.socialData.likesCount)
            .subscribe((likes: any[]) => {
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
        this.modal = {
            name: 'editModal',
            component: EditModalContentComponent,
            data: null
        }
    }

    public clickImage(index: number) {
        const carName = this.carService.getCarName(this.post.carData.make, this.post.carData.model);
        // open modal
        this.modal = {
            name: 'imageModal',
            component: ImageModalContentComponent,
            data: {
                images: this.post.activityData.contentUris,
                index,
                carName,
                date: this.post.activityData.createdDate
            }
        }
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