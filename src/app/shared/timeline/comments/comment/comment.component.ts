import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CommentsService, ModalService, TimelineService, LikesService } from '../../../../services/index';
import { EditCommentsComponent } from '../editComments/editComments.component';

declare const jQuery: any;

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    providers: [
        ModalService,
        LikesService,
        { provide: 'likesType', useValue: 'comment' }
    ]
})

export class CommentComponent implements OnInit {
    @Input() comment: any;
    @Input() postId: string;

    public loading: boolean;
    public addLoading: boolean;
    public removeLoading: string;
    public newCommentText: string;
    public EditCommentsComponent: any = EditCommentsComponent;
    public modal: string;
    public likes: any = [];

    constructor(
        private commentsService: CommentsService,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private likesService: LikesService

    ) {
        // on modal open/close :
        this.modalService.getModalClose().subscribe(() => {
            // close modal
            this.modal = '';
        });
    }

    ngOnInit() {
        // Request likes
        this.likesService.getLikes(this.comment.id, this.comment.dataRequested).subscribe((likes: any[]) => {
            this.likes = likes;
        });
    }

    public clickRemove() {
        this.removeLoading = this.comment.id;

        this.commentsService.removeComment(this.postId, this.comment.id).subscribe(comment => {
            this.removeLoading = null;
            this.timelineService.updateCommentsCount(this.postId, -1);
        });
    }

    public clickEdit() {
        this.commentsService.setSelectedComment(this.comment);
        this.timelineService.setSelectedPostId(this.postId);

        this.modal = 'editComments';
    }

    public clickLike() {
        this.likesService.likePost(this.comment.id).subscribe();
    }
}