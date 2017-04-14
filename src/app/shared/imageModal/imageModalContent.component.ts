import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'content',
    templateUrl: './imageModalContent.component.html',
    styleUrls: ['./imageModalContent.component.scss']
})

export class ImageModalContentComponent implements OnInit {
    @Input() contentData: any;

    public image: any;
    public currentImageIndex: number;
    public imageListLength: number;
    private images: any[];

    constructor() { }

    ngOnInit() {
        this.setImages();
    }

    public navigate(direction: number) {
        const imageListLength = this.images.length;

        this.currentImageIndex += direction;
        this.image = this.images[this.currentImageIndex];
    }

    private setImages() {
        this.images = this.contentData.images;

        this.currentImageIndex = this.contentData.index;
        this.imageListLength = this.images.length;
        this.image = this.images[this.currentImageIndex];
    }
}