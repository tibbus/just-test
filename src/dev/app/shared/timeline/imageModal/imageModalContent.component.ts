import { Component, OnInit } from '@angular/core';
import { PostService, ModalService, TimelineService } from '../../../services/index';
import { TimelineDatePipe } from '../timelineDate.pipe';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/shared/timeline/imageModal/imageModalContent.component.html',
    styleUrls: ['src/dist/app/shared/timeline/imageModal/imageModalContent.component.css'],
    pipes: [TimelineDatePipe]
})

export class ImageModalContentComponent implements OnInit {
    status: any;
    image: any;
    post: any;
    currentImageIndex: number;
    imageListLength: number;
    createdDate: string;

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.currentImageIndex = this.timelineService.selectedImage;

        this.imageListLength = this.timelineService.selectedPost.details.contentUris.length;

        this.image = this.timelineService.selectedPost.details.contentUris[this.currentImageIndex];

        this.createdDate = this.timelineService.selectedPost.details.createdDate;
    }

    navigate(direction: number) {
        const imageListLength = this.timelineService.selectedPost.details.contentUris.length;

        this.currentImageIndex += direction;

        this.image = this.timelineService.selectedPost.details.contentUris[this.currentImageIndex];
    }
}