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
import { CommentsComponnent } from './timeline/comments/comments.component';
import { EditCommentsComponent } from './timeline/comments/editComments.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        AlertComponent,
        LoadingComponent,
        ModalComponent,
        UploadFileDirective,
        TimelineComponent,
        TimelineDatePipe,
        ImageModalContentComponent,
        EditCommentsComponent,
        CommentsComponnent
    ],
    entryComponents: [
        ImageModalContentComponent,
        EditCommentsComponent
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
        ImageModalContentComponent,
        EditCommentsComponent,
        CommentsComponnent
    ]
})

export class SharedModule { }
