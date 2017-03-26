import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CommentsService, ModalService, TimelineService, LikesService } from '../../../services/index';
import { EditCommentsComponent } from './editComments/editComments.component';

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {
    @Input() post: any;
    @Output() commentsCount: EventEmitter<number> = new EventEmitter<number>();

    public comments = [];
    public loading: boolean;
    public addLoading: boolean;
    public removeLoading: string;
    public newCommentText: string;
    private postId: string;

    constructor(
        private commentsService: CommentsService,
        private timelineService: TimelineService

    ) { }

    ngOnInit() {
        this.postId = this.post.activityData.id;
        this.loading = true;

        this.commentsService.getComments(this.postId, this.post.socialDataRequested, this.post.socialData.commentsCount)
            .subscribe(comments => {
                this.loading = false;

                this.commentsCount.emit(comments.length);

                this.comments = comments;
            });

        if (this.post.socialDataRequested) {
            this.loading = false;
        }
    }

    public clickAddComment() {
        this.addLoading = true;

        this.commentsService.addComment(this.postId, this.newCommentText).subscribe(data => {
            this.newCommentText = '';
            this.addLoading = false;

            this.timelineService.updateCommentsCount(this.postId, 1);;
        });
    }
}