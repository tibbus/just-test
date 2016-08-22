import { Component, Input } from '@angular/core';

import { EditModalContentComponent } from './editModalContent.component';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ModalService } from '../../../services/index';

@Component({
    selector: 'edit-modal',
    templateUrl: 'src/dev/app/common/modal/modal.component.html',
    directives: [EditModalContentComponent]
})

export class EditModalComponent extends ModalComponent {
    @Input() status: string;

    constructor(private modalservice: ModalService) {
        super(modalservice);

        this.title = 'Edit post';
        this.showSaveButton = true;
    }
}