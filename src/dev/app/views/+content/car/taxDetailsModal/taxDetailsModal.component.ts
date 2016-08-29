import { Component } from '@angular/core';

import { TaxDetailsModalContentComponent } from './taxDetailsModalContent.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { ModalService } from '../../../../services/index';

@Component({
    selector: 'tax-details-modal',
    templateUrl: 'src/dev/app/components/modal/modal.component.html',
    directives: [TaxDetailsModalContentComponent]
})

export class TaxDetailsModalComponent {
    constructor(private _modalservice: ModalService) {
        //super(_modalservice);

        //this.title = 'Tax details';
    }
}