import {Component} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
    selector: 'video-modal',
    templateUrl: 'src/dev/app/common/modal/common/modal.component.html'
})

export abstract class ModalComponent {
    title: string = 'Default Title !';

    constructor(private _modalService: ModalService) { }  

    ngOnInit() {
        jQuery('#myModal').on('hidden.bs.modal', (e) => {
            this.onModalClose();  
        })
    }

    onModalClose() {
        this._modalService.setModalName('');
    }
}