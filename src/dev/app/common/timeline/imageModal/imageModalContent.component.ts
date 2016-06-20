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

    constructor(
        private statusService: StatusService,
        private modalService: ModalService,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        const index = this.timelineService.selectedImage;

        this.image = this.timelineService.selectedPost.details.contentUris[index];
    }
}