import { Component, OnInit } from '@angular/core';
import { StatusService, ModalService, TimelineService } from '../../../services/index';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/common/timeline/imageModal/imageModalContent.component.html',
    styleUrls: ['src/dist/app/common/timeline/imageModal/imageModalContent.component.css'],
})

export class ImageModalContentComponent implements OnInit {
    status: any;
    image: any;
    post: any;
    currentImageIndex: number;
    imageListLength: number;

    constructor(
        private statusService: StatusService,
        private modalService: ModalService,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.currentImageIndex = this.timelineService.selectedImage;

        this.imageListLength = this.timelineService.selectedPost.details.contentUris.length;

        this.image = this.timelineService.selectedPost.details.contentUris[this.currentImageIndex];
    }

    navigate(direction: number) {
        const imageListLength = this.timelineService.selectedPost.details.contentUris.length;

        this.currentImageIndex += direction;

        this.image = this.timelineService.selectedPost.details.contentUris[this.currentImageIndex];
    }
}