import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ApiService, CarService, API } from '../index';

@Injectable()
export class CommentsService {
    private selectedComment: any;
    private $comments = new Subject<any>();

    constructor(private http: Http, private apiService: ApiService) { }

    getComments(postId: string) {
        this.fetchComments(postId);

        return this.$comments;
    }

    fetchComments(postId: string) {
        const $dataComments = this.http
            .get(this.apiService.getCommentsUrl(postId))
            .map(res => res.json())

        $dataComments.subscribe(data => {
            this.$comments.next(data);
        });

        return $dataComments;
    }

    addComment(postId: string, commentText: string) {
        const body = {
            'authorUserId': this.apiService.getUserId(),
            'recipientUserId': this.apiService.getUserId(),
            'comment': commentText
        };

        return this.http.request(this.apiService.getCommentsUrl(postId), {
            body,
            method: 'POST'
        })
            .do(data => console.log(data))
    }

    removeComment(postId: string, commentId: string) {
        const body = '';

        return this.http.request(this.apiService.getChangeCommentsUrl(postId, commentId), {
            body: '',
            method: 'DELETE'
        })
            .do(data => console.log(data))
    }

    updateComment(commentId: string, postId: string, comment: string) {
        const body = {
            comment
        };

        return this.http.request(this.apiService.getChangeCommentsUrl(postId, commentId), {
            body,
            method: 'PUT'
        })
            .do(data => console.log(data))
    }

    setSelectedComment(comment: any) {
        this.selectedComment = comment;
    }

    getSelectedComment() {
        return this.selectedComment;
    }
}