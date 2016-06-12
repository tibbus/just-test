import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StatusService, ModalService, TimelineService } from '../../services/index';
import { LoadingComponent } from '../loading/loading.component';
import { EditModalComponent } from './editModal/editModal.component';
import { TimelineDatePipe } from './timelineDate.pipe';

@Component({
    selector: 'timeline',
    styleUrls: ['src/dist/app/common/timeline/timeline.component.css'],
    templateUrl: 'src/dev/app/common/timeline/timeline.component.html',
    directives: [LoadingComponent, EditModalComponent],
    providers: [ModalService, StatusService],
    pipes: [TimelineDatePipe]
})

export class TimelineComponent {
    private modalSubscription: Subscription;

    statuses: any[];
    loading: string;
    modalName: string;
    selectedPostId: string;

    constructor(
        private statusService: StatusService,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService
    ) {
        //super(statusService, modalService, ref, timelineService);

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
        this.timelineService.getPosts().subscribe(
            (statuses: any) => {
                this.statuses = statuses.results.reverse().map(item => {
                    return item.details;
                });
            }
        )
    }

    onClickDelete(statusId: string) {
        this.loading = statusId;

        this.statusService.deleteStatus(statusId).delay(500).subscribe(
            statuses => {
                this.loading = null;

                // update the status list (make a new server request in the service)
                this.timelineService.getPosts(true);
            }
        )
    }

    onClickEdit(postId: string) {
        this.selectedPostId = postId;
        this.timelineService.selectedPostId = postId;

        this.modalService.setModalName('editModal');
    }
}