import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

import { CommentsService } from '../../../services/index';


@Component({
    moduleId: module.id,
    selector: 'comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.css']
})

export class CommentsComponnent implements OnInit {
    @Input() postId: string;

    public comments = null;
    constructor(private commentsService: CommentsService) { }

    ngOnInit() {
        this.commentsService.getComments(this.postId).subscribe(comments => {
            //post.comments.state = '-';
            //post.comments.loading = false;

            // Add the comments [] to the post Object of this.posts (by reference)
            //post.comments.list = comments;
            this.comments = comments;
        })
    }

    clickAddComment(post: any) {
        post.comments.addCommentLoading = true;

        this.commentsService.addComment(post).subscribe(data => {
            this.commentsService.getComments(post.id).subscribe(comments => {
                // Add the comments [] to the post Object of this.posts (by reference)
                post.comments.list = comments;
                post.comments.newComment = '';
                post.comments.addCommentLoading = false;
            })
        });
    }
}