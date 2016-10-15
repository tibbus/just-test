import { Component, OnInit } from '@angular/core';
import { PostService, ModalService, TimelineService } from '../../../services/index';

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'imageModalContent.component.html',
    styleUrls: ['imageModalContent.component.css']
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

        this.imageListLength = this.timelineService.selectedPost.contentUris.length;

        this.image = this.timelineService.selectedPost.contentUris[this.currentImageIndex];

        this.createdDate = this.timelineService.selectedPost.createdDate;
    }

    navigate(direction: number) {
        const imageListLength = this.timelineService.selectedPost.contentUris.length;

        this.currentImageIndex += direction;

        this.image = this.timelineService.selectedPost.contentUris[this.currentImageIndex];
    }
}