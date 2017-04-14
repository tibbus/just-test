import { Component, Input } from '@angular/core';

@Component({
    selector: 'content',
    templateUrl: './videoModalContent.component.html',
    styleUrls: ['./videoModalContent.component.scss']
})

export class VideoModalContentComponent {
    @Input() contentData: any;

    private video;

    constructor() { }

    ngOnInit() {
        this.video = document.getElementById('videoData');
    }

    // @todo Move this to a directive
    public clickVideo() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
}