import {Component} from 'angular2/core';
import {ContentComponent} from './content/content.component';
import {ModalComponent} from '../../../../../modal/modal.component';
import {ModalService} from '../../../../../modal/modal.service';

@Component({
    selector: 'video-modal',
    templateUrl: 'src/dev/app/modal/modal.component.html',
    directives: [ContentComponent]
})

export class VideoModalComponent extends ModalComponent {
    constructor(private _modalservice: ModalService) {
        super(_modalservice);

        this.title = 'video Modal title';
    }
}