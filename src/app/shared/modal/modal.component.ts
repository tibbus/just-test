import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'modal',
    templateUrl: 'modal.component.html'
})

export class ModalComponent {
    @Input() contentComponent: any;
    @Input() title: string;
    @Input() size: string;
    @Input() showSaveButton: boolean;
    @ViewChild('dynamicComponent', { read: ViewContainerRef })

    dynamicComponent: any;

    private modalSubscription: Subscription;
    private modalSubscription2: Subscription;
    loading: boolean;

    constructor(private modalService: ModalService,
        private componentResolver: ComponentFactoryResolver
    ) { }  

    ngAfterViewInit() {
        console.log(this.dynamicComponent)
        const factory = this.componentResolver.resolveComponentFactory(this.contentComponent);

        this.dynamicComponent.createComponent(factory);
    }

    ngOnInit() {
        jQuery('#myModal').on('hidden.bs.modal', (e) => {
            this.onModalClose();  
        })

        this.modalSubscription = this.modalService.getModalClose$().delay(1).subscribe(
            () => {
                jQuery('#myModal').modal('hide');
            }
        );

        this.modalSubscription2 = this.modalService.getModalLoading$().subscribe(
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
        this.modalService.setModalName$('');
    }

    onClickSave() {
        this.modalService.setModalSave$();
    }
}