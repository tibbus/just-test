import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StatusService, ModalService } from '../../../../services/index';
import { LoadingComponent } from '../../../../common/loading/loading.component';
import { EditModalComponent } from './editModal/editModal.component';

@Component({
    selector: 'wall',
    styleUrls: ['src/dist/app/views/+content/car/wall/wall.component.css'],
    templateUrl: 'src/dev/app/views/+content/car/wall/wall.component.html',
    directives: [LoadingComponent, EditModalComponent],
    providers: [ModalService]
})

export class WallComponent implements OnInit {
    private modalSubscription: Subscription;

    statuses: any[];
    loading: string;
    modalName: string;
    selectedStatusId: string;
    selectedStatusText: string = 'aa';

    constructor(private statusService: StatusService, private modalService: ModalService, private ref: ChangeDetectorRef) {
        // on modal open/close :
        this.modalSubscription = modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                // open the modal
                jQuery('#myModal').modal('show');
            });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    } 

    ngOnInit() {
        this.statusService.getStatuses().subscribe(
            statuses => {
                this.statuses = statuses.reverse();
            }
        )
    }

    onClickDelete(statusId: string) {
        this.loading = statusId;

        this.statusService.deleteStatus(statusId).delay(500).subscribe(
            statuses => {
                this.loading = null;

                // update the status list (make a new server request in the service)
                this.statusService.getStatuses(true);
            }
        )
    }

    onClickEdit(statusId: string) {
        this.selectedStatusId = statusId;
        this.statusService.selectedStatusId = statusId;

        this.modalService.setModalName('editModal');
    }
}