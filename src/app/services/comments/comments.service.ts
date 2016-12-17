import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ApiService, CarService, API } from '../index';

@Injectable()
export class CommentsService {
    private selectedComment: any;
    private $comments = new Subject<any>();

    constructor(private http: Http, private apiService: ApiService) { }

    public getComments(postId: string) {
        this.fetchComments(postId);

        return this.$comments;
    }

    public fetchComments(postId: string) {
        const $dataComments = this.http
            .get(this.apiService.getCommentsUrl(postId))
            .map(res => res.json())

        $dataComments.subscribe(data => {
            this.$comments.next(data);
        });

        return $dataComments;
    }

    public addComment(postId: string, commentText: string) {
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

    public removeComment(postId: string, commentId: string) {
        const body = '';

        return this.http.request(this.apiService.getChangeCommentsUrl(postId, commentId), {
            body: '',
            method: 'DELETE'
        })
            .do(data => console.log(data))
    }

    public updateComment(commentId: string, postId: string, comment: string) {
        const body = {
            comment
        };

        return this.http.request(this.apiService.getChangeCommentsUrl(postId, commentId), {
            body,
            method: 'PUT'
        })
            .do(data => console.log(data))
    }

    public setSelectedComment(comment: any) {
        this.selectedComment = comment;
    }

    public getSelectedComment() {
        return this.selectedComment;
    }
}