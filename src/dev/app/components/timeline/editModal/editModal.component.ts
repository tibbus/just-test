import { Component, Input } from '@angular/core';

import { EditModalContentComponent } from './editModalContent.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ModalService } from '../../../services/index';

@Component({
    selector: 'edit-modal',
    templateUrl: 'src/dev/app/components/modal/modal.component.html',
    directives: [EditModalContentComponent]
})

export class EditModalComponent {
    @Input() status: string;

    constructor(private modalservice: ModalService) {
        //super(modalservice);

        //this.title = 'Edit post';
        //this.showSaveButton = true;
    }
}