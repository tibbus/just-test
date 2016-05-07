import {Component} from '@angular/core';
import {ContentComponent} from './content/content.component';
import {ModalComponent} from '../../../../../common/modal/modal.component';
import {ModalService} from '../../../../../common/modal/modal.service';

@Component({
    selector: 'mot-details-modal',
    templateUrl: 'src/dev/app/common/modal/modal.component.html',
    directives: [ContentComponent]
})

export class MotDetailsModalComponent extends ModalComponent {
    constructor(private _modalservice: ModalService) {
        super(_modalservice);

        this.title = 'MOT details';
    }
}