import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services/index';

@Component({
    selector: 'video-modal',
    templateUrl: 'src/dev/app/components/modal/components/modal.component.html'
})

export abstract class ModalComponent {
    constructor(private modalService: ModalService) { }  

    title: string = 'Default Title !';
    showSaveButton: boolean = false;
    private modalSubscription: Subscription;
    private modalSubscription2: Subscription;
    loading: boolean;

    ngOnInit() {
        jQuery('#myModal').on('hidden.bs.modal', (e) => {
            this.onModalClose();  
        })

        this.modalSubscription = this.modalService.closeModal.delay(500).subscribe(
            () => {
                jQuery('#myModal').modal('hide');
            }
        );

        this.modalSubscription2 = this.modalService.loading.subscribe(
            () => {
                this.loading = true;
            }
        );
    }

    ngOnDestroy() {
        // TODO : find a better way to handle this
        this.modalSubscription.unsubscribe();
        this.modalSubscription2.unsubscribe();
    }

    onModalClose() {
        this.modalService.setModalName('');
    }

    onClickSave() {
        this.modalService.sendClickSave();
    }
}