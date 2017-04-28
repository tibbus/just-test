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
    public timeline: any = {
        postsCount: 0,
        mediaCount: 0,
        images: [],
        videos: [],
        docs: []
    };
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

            const actor = {
                actorId: carId,
                actorType: 'car'
            };
            this.getPosts(actor);
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
            data: {
                images: this.timeline.images,
                index,
                carName: this.timeline.carName
            }
        };
        this.timelineService.setSelectedImage(index);

        // open modal
        this.modal = 'imageModal';
    }

    public clickVideo(index: number) {
        this.videoModalContent = {
            component: VideoModalContentComponent,
            data: this.timeline.videos[index]
        };

        // open modal
        this.modal = 'videoModal';
    }


    private getPosts(actor) {
        return this.timelineService.getTimeline(actor).subscribe(
            timelineData => {
                this.timeline = timelineData;
            }
        );
    }
}