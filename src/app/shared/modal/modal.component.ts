import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services/index';

declare const jQuery: any;

@Component({
    selector: 'modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html'
})

export class ModalComponent {
    @Input() contentComponent: any;
    @Input() title: string;
    @Input() size: string;
    @Input() showSaveButton: boolean;
    @Input() hideFooter: boolean;
    @ViewChild('dynamicComponent', { read: ViewContainerRef })

    dynamicComponent: any;

    private subModalClose: Subscription;
    private subModalLoading: Subscription;
    public loading: boolean;

    constructor(private modalService: ModalService,
        private componentResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        jQuery('#myModal').on('hidden.bs.modal', (e) => {
            this.onModalClose();
        })
        jQuery('#myModal').on('show.bs.modal', (e) => {
            this.renderModalContent();
        })
        jQuery('#myModal').modal('show');

        this.subModalClose = this.modalService.getModalClose().subscribe(
            () => {
                jQuery('#myModal').modal('hide');
            }
        );

        this.subModalLoading = this.modalService.getModalLoading().subscribe(
            () => {
                this.loading = true;
            }
        );
    }

    ngOnDestroy() {
        this.subModalClose.unsubscribe();
        this.subModalLoading.unsubscribe();
    }

    public onClickSave() {
        this.modalService.setModalSave();
    }

    private renderModalContent() {
        const factory = this.componentResolver.resolveComponentFactory(this.contentComponent);
        this.dynamicComponent.createComponent(factory);
    }

    private onModalClose() {
        this.modalService.setModalClose();
    }
}