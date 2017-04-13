import { Component, Input } from '@angular/core';

@Component({
    selector: 'content',
    templateUrl: './videoModalContent.component.html',
    styleUrls: ['./videoModalContent.component.scss']
})

export class VideoModalContentComponent {
    @Input() contentData: any;

    constructor() { }
}