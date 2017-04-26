import { Component, Input } from '@angular/core';

import { VerifyService, ModalService } from '../../../../../services/';
import { Letters } from  '../../../../../services/verify/verify.model';

@Component({
    selector: 'verify',
    styleUrls: ['./verify.component.scss'],
    templateUrl: './verify.component.html'
})

export class VerifyComponent {
    @Input() contentData: any;

    public letters: Letters = {
        firstLetter: null,
        secondLetter: null,
        lastLetter: null
    };
    public verifyFailed: boolean = false;

    constructor(private verifyService: VerifyService, private modalService: ModalService) { }

    ngOnInit() {
    }

    public clickConfirm() {
        this.verifyService.verify(this.contentData.carInfoId, this.contentData.userId, this.letters).subscribe((response: any) => {
            if (response.verified) {
                this.modalService.setModalClose();
            } else {
                this.verifyFailed = true;
            }
        });
    }

    // reset input before keypress
    public keydownLetter(type: string) {
        this.letters[type] = null;
    }
}
