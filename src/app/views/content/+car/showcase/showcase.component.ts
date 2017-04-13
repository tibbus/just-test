import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ImageModalContentComponent } from '../../../../shared/imageModal/imageModalContent.component';
import { VideoModalContentComponent } from '../../../../shared/videoModal/videoModalContent.component';
import { TimelineService, ModalService } from '../../../../services/index';

@Component({
    selector: 'showcase',
    styleUrls: ['./showcase.component.scss'],
    templateUrl: './showcase.component.html'
})

export class ShowcaseComponent implements OnInit, OnDestroy {
    private emptyPosts = {
        images: [],
        videos: [],
        docs: []
    };
    public posts: any = this.emptyPosts;
    public modal: string;
    public imageModalContent;
    public videoModalContent;
    private route$: any;

    constructor(private route: ActivatedRoute, private timelineService: TimelineService, private modalService: ModalService) { }

    ngOnInit() {
        this.route$ = this.route.parent.params.subscribe(params => {
            const carRoute = params['id'];
            const parsedRoute = carRoute.split('-');
            const carId = parsedRoute[parsedRoute.length - 1];

            this.timelineService.actor = {
                actorId: carId,
                actorType: 'car'
            };

            this.getPosts();
        });

        this.modalService.getModalClose().subscribe(() => {
            this.modal = '';
        });
    }

    ngOnDestroy() {
        this.route$.unsubscribe();
    }

    public clickImage(index: number) {
        this.imageModalContent = {
            component: ImageModalContentComponent,
            data: null
        };
        this.timelineService.setSelectedImage(index);

        // open modal
        this.modal = 'imageModal';
    }

    public clickVideo(index: number) {
        this.videoModalContent = {
            component: VideoModalContentComponent,
            data: this.posts.videos[index]
        };

        // open modal
        this.modal = 'videoModal';
    }


    private getPosts() {
        return this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
                // create new Object
                this.posts = Object.assign({}, this.emptyPosts);

                posts.forEach(item => {
                    if (item.type === 'Image') {
                        this.posts.images = this.posts.images.concat(item.activityData.contentUris)
                    } else if (item.type === 'Video') {
                        this.posts.videos = this.posts.videos.concat(item.activityData.contentUris)
                    } else if (item.type === 'Document') {
                        this.posts.docs = this.posts.docs.concat(item.activityData.contentUris)
                    }
                });

                this.timelineService.setImages(this.posts.images);
                this.timelineService.setSelectedPostId(posts[0].activityData.id);
            }
        );
    }
}