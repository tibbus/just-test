import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommentsService, ModalService, TimelineService } from '../../../services/index';

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'editComments.component.html',
    styleUrls: ['editComments.component.css']
})

export class EditCommentsComponent implements OnInit {
    public newCommentText: string = null;
    public selectedComment: any;

    constructor(
        private commentsService: CommentsService,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.modalService.clickSave.subscribe(
            () => {
                this.savePost();
            }
        );

        this.selectedComment = this.commentsService.getSelectedComment();
        this.newCommentText = this.selectedComment.comment;
    }

    savePost() {
        this.modalService.setLoading();

        const commentId =  this.selectedComment.id;
        const postId = this.timelineService.selectedPostId;

        this.commentsService.updateComment(commentId, postId, this.newCommentText).subscribe(
            () => {
                // update the Comments
                this.commentsService.fetchComments(postId).subscribe(data => {
                    this.modalService.sendModalClose();
                });
            }
        );
    }
}