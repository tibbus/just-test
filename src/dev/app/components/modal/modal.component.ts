import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentResolver,
ComponentRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services/index';

@Component({
    selector: 'modal',
    templateUrl: 'src/dev/app/components/modal/modal.component.html'
})

export class ModalComponent {
    @Input() contentComponent: any;
    @Input() title: string;
    @ViewChild('dynamicComponent', { read: ViewContainerRef })

    dynamicComponent: any;
    showSaveButton: boolean = false;
    private modalSubscription: Subscription;
    private modalSubscription2: Subscription;
    loading: boolean;

    constructor(private modalService: ModalService,
        private componentResolver: ComponentResolver
    ) { }  

    ngAfterViewInit() {
        this.componentResolver.resolveComponent(this.contentComponent).then((factory) => {
            this.dynamicComponent.createComponent(factory);
        });
    }

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