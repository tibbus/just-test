import { Component } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { ModalComponent } from '../../../../../common/modal/modal.component';
import { ModalService } from '../../../../../services/index';

@Component({
    selector: 'video-modal',
    templateUrl: 'src/dev/app/common/modal/modal.component.html',
    directives: [ContentComponent]
})

export class VideoModalComponent extends ModalComponent {
    constructor(private modalservice: ModalService) {
        super(modalservice);

        this.title = 'video Modal title';
    }
}