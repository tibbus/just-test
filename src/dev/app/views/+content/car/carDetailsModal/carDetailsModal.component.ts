﻿import { Component } from '@angular/core';

import { CarDetailsModalContentComponent } from './carDetailsModalContent.component';
import { ModalComponent } from '../../../../common/modal/modal.component';
import { ModalService } from '../../../../services/index';

@Component({
    selector: 'car-details-modal',
    templateUrl: 'src/dev/app/common/modal/modal.component.html',
    directives: [CarDetailsModalContentComponent]
})

export class CarDetailsModalComponent extends ModalComponent {
    constructor(private _modalservice: ModalService) {
        super(_modalservice);

        this.title = 'Car details';
    }
}