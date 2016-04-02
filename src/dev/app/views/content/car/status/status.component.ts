import {Component, ChangeDetectorRef} from 'angular2/core';
import {VideoModalComponent} from './videoModal/videoModal.component';
import {MilestoneModalComponent} from './milestoneModal/milestoneModal.component';
import {ModalService} from '../../../../common/modal/modal.service';

@Component({
    selector: 'status',
    styleUrls: ['src/dist/app/views/content/car/status/status.component.css'],
    templateUrl: 'src/dev/app/views/content/car/status/status.component.html',
    directives: [VideoModalComponent, MilestoneModalComponent],
    providers: [ModalService]
})

export class StatusComponent {
    modalName: string;

    constructor(private _modalService: ModalService, private ref: ChangeDetectorRef) {
        _modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();
            })
    }  

    onMenuClick(modalName: string) {
        this.modalName = modalName;
    }
}