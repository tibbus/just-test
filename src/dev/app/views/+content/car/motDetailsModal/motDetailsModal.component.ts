import { Component } from '@angular/core';

import { MotDetailsModalContent } from './motDetailsModalContent.component';
import { ModalComponent } from '../../../../common/modal/modal.component';
import { ModalService } from '../../../../services/index';

@Component({
    selector: 'mot-details-modal',
    templateUrl: 'src/dev/app/common/modal/modal.component.html',
    directives: [MotDetailsModalContent]
})

export class MotDetailsModalComponent extends ModalComponent {
    constructor(private _modalservice: ModalService) {
        super(_modalservice);

        this.title = 'MOT details';
    }
}