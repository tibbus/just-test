import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StatusService, ModalService, TimelineService } from '../../services/index';
import { LoadingComponent } from '../loading/loading.component';
import { EditModalComponent } from './editModal/editModal.component';

@Component({
    selector: 'timeline',
    styleUrls: ['src/dist/app/common/timeline/timeline.component.css'],
    templateUrl: 'src/dev/app/common/timeline/timeline.component.html',
    directives: [LoadingComponent, EditModalComponent],
    providers: [ModalService]
})

export class TimelineComponent {
    constructor(
        private _statusService: StatusService,
        private _modalService: ModalService,
        private _ref: ChangeDetectorRef,
        private _timelineService: TimelineService
    ) { }
}