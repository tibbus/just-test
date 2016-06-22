﻿import { Component, Input } from '@angular/core';

import { ImageModalContentComponent } from './imageModalContent.component';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ModalService } from '../../../services/index';

@Component({
    selector: 'image-modal',
    templateUrl: 'src/dev/app/common/modal/modal.component.html',
    directives: [ImageModalContentComponent]
})

export class ImageModalComponent extends ModalComponent {
    @Input() status: string;

    modalSize: string;

    constructor(private modalservice: ModalService) {
        super(modalservice);

        this.title = '';
        this.modalSize = 'large';
    }
}