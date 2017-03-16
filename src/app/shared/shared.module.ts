import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent }  from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { UploadFileDirective } from './uploadFile.directive';
import { TimelineComponent } from './timeline/timeline.component';
import { PostComponent } from './timeline/post/post.component';
import { TimelineDatePipe } from './timelineDate.pipe';
import { ImageModalContentComponent } from './imageModal/imageModalContent.component';
import { EditModalContentComponent } from './timeline/editModal/editModalContent.component';
import { CommentsComponent } from './timeline/comments/comments.component';
import { CommentComponent } from './timeline/comments/comment/comment.component';
import { EditCommentsComponent } from './timeline/comments/editComments/editComments.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [
        AlertComponent,
        LoadingComponent,
        ModalComponent,
        UploadFileDirective,
        TimelineComponent,
        PostComponent,
        TimelineDatePipe,
        ImageModalContentComponent,
        EditModalContentComponent,
        EditCommentsComponent,
        CommentsComponent,
        CommentComponent
    ],
    entryComponents: [
        ImageModalContentComponent,
        EditModalContentComponent,
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
        PostComponent,
        TimelineDatePipe,
        ImageModalContentComponent,
        EditCommentsComponent,
        CommentsComponent,
        CommentComponent
    ]
})

export class SharedModule { }
