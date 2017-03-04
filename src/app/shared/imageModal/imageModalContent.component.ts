import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostService, ModalService, TimelineService } from '../../services/index';

@Component({
    selector: 'content',
    templateUrl: './imageModalContent.component.html',
    styleUrls: ['./imageModalContent.component.scss']
})

export class ImageModalContentComponent implements OnInit {
    status: any;
    image: any;
    post: any;
    currentImageIndex: number;
    imageListLength: number;
    createdDate: string;
    private images: any[];

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private timelineService: TimelineService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const route = this.route.snapshot.url[0].path;

        this.setImages(route);
    }

    public navigate(direction: number) {
        const imageListLength = this.images.length;

        this.currentImageIndex += direction;
        this.image = this.images[this.currentImageIndex];
    }

    private setImages(pageName: string) {
        this.images = this.timelineService.getImages();

        this.currentImageIndex = this.timelineService.getSelectedImage();
        this.imageListLength = this.images.length;
        this.image = this.images[this.currentImageIndex];

        if (pageName !== 'showcase') {
            this.createdDate = this.timelineService.getSelectedPost().activityData.createdDate;
        }
    }
}