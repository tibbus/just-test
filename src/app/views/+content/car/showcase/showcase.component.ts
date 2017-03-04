import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ImageModalContentComponent } from '../../../../shared/imageModal/imageModalContent.component';
import { TimelineService, ModalService } from '../../../../services/index';

@Component({
    selector: 'showcase',
    styleUrls: ['./showcase.component.scss'],
    templateUrl: './showcase.component.html'
})

export class ShowcaseComponent {
    public posts: any = {};
    public modal: string;
    public ImageModalComponent: any = ImageModalContentComponent;

    constructor(private route: ActivatedRoute, private timelineService: TimelineService, private modalService: ModalService) { }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
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

    public clickImage(index: number) {
        this.timelineService.setSelectedImage(index);

        // open modal
        this.modal = 'imageModal';
    }


    private getPosts() {
        this.posts = {
            images: [],
            videos: [],
            docs: []
        };

        return this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
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
            }
        );
    }
}