import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent }  from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { UploadFileDirective } from './uploadFile.directive';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineDatePipe } from './timelineDate.pipe';
import { ImageModalContentComponent } from './timeline/imageModal/imageModalContent.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AlertComponent,
        LoadingComponent,
        ModalComponent,
        UploadFileDirective,
        TimelineComponent,
        TimelineDatePipe,
        ImageModalContentComponent
    ],
    entryComponents: [
        ImageModalContentComponent
    ],
    exports: [
        AlertComponent,
        LoadingComponent,
        ModalComponent, 
        CommonModule,
        FormsModule,
        UploadFileDirective,
        TimelineComponent,
        TimelineDatePipe,
        ImageModalContentComponent
    ]
})

export class SharedModule { }
