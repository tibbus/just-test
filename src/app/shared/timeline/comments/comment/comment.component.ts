import { Component, OnInit, ChangeDetectorRef, Input, HostListener } from '@angular/core';
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
    @HostListener('mouseenter') mouseoverComment() {
        //clearTimeout(this.showOptionsTimeout);
        this.showOptions = true;
    };
    @HostListener('mouseleave') mouseleaveComment() {
        this.showOptions = false
        //this.showOptionsTimeout = setTimeout(() => this.showOptions = false, 500);
    };

    public loading: boolean;
    public loadingRemove: boolean;
    public removeLoading: boolean;
    public newCommentText: string;
    public EditCommentsComponent: any = EditCommentsComponent;
    public modal: string;
    public likes: any = [];
    public showOptions: boolean = false;
    private showOptionsTimeout: any;

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
        // @todo enable likes for comments ??
        // this.likesService.getLikes(this.comment.id, this.comment.dataRequested).subscribe((likes: any[]) => {
        //     this.likes = likes;
        // });
    }

    public clickRemove() {
        this.loadingRemove = true;
        this.showOptions = false;

        this.commentsService.removeComment(this.postId, this.comment.id).subscribe(comment => {
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