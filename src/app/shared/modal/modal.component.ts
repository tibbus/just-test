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
    // @todo replace contentComponent with the content @Input
    @Input() contentComponent: any;
    @Input() content: any;
    @Input() title: string;
    @Input() size: string;
    @Input() hideHeader: boolean;
    @Input() showSaveButton: boolean;

    @ViewChild('dynamicComponent', { read: ViewContainerRef })

    dynamicComponent: any;

    private subModalClose: Subscription;
    private subModalLoading: Subscription;
    private subModalSave: any;
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
        this.loading = true;
        this.subModalSave = this.modalService.setModalSave();
    }

    private renderModalContent() {
        const factory = this.componentResolver.resolveComponentFactory(this.contentComponent || this.content.component);

        let componentRef = this.dynamicComponent.createComponent(factory);
        componentRef.instance.contentData = this.content ? this.content.data : null;
    }

    private onModalClose() {
        this.modalService.setModalClose();
    }
}