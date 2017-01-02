import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CommentsService, ModalService, TimelineService } from '../../../services/index';
import { EditCommentsComponent } from './editComments.component';

declare const jQuery: any;

@Component({
    //moduleId: module.id,
    selector: 'comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: [ModalService, CommentsService]
})

export class CommentsComponnent implements OnInit {
    @Input() postId: string;

    public comments = [];
    public loading: boolean;
    public addLoading: boolean;
    public removeLoading: string;
    public newCommentText: string;
    public EditCommentsComponent: any = EditCommentsComponent;
    private modalSubscription: Subscription;
    public modalName: string;

    constructor(
        private commentsService: CommentsService,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService
    ) {

        // on modal open/close :
        this.modalSubscription = this.modalService.getModalName$().subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                if (modalName) {
                    // open the modal
                    jQuery('#myModal').modal('show');
                }
            });
    }

    ngOnInit() {
        this.loading = true;

        this.commentsService.getComments(this.postId).subscribe(comments => {
            //post.comments.state = '-';
            this.loading = false;

            // Add the comments [] to the post Object of this.posts (by reference)
            //post.comments.list = comments;
            this.comments = comments;
        })
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }

    clickAddComment() {
        this.addLoading = true;

        this.commentsService.addComment(this.postId, this.newCommentText).subscribe(data => {
            this.commentsService.getComments(this.postId).subscribe(comments => {
                // Add the comments [] to the post Object of this.posts (by reference)
                this.comments = comments;
                this.newCommentText = '';
                this.addLoading = false;

                this.timelineService.updateCommentsCount(this.postId, 1);
            });
        });
    }

    clickRemove(commentId: string) {
        this.removeLoading = commentId;

        this.commentsService.removeComment(this.postId, commentId).subscribe(comments => {
            this.commentsService.getComments(this.postId).subscribe(comments => {
                this.comments = comments;

                this.removeLoading = null;

                this.timelineService.updateCommentsCount(this.postId, -1);
            })
        });
    }

    clickEdit(selectedComment: any) {
        this.commentsService.setSelectedComment(selectedComment);
        this.timelineService.setSelectedPostId(this.postId);

        this.modalService.setModalName$('editComments');
    }
}