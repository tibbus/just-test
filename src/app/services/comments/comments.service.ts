import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../api/api.service';
import { API } from '../api/api';
import { CarService } from '../car/car.service';

@Injectable()
export class CommentsService {
    private selectedComment: any;
    private comments: any = [];
    private comments$ = new Subject<any>();

    constructor(private http: Http, private apiService: ApiService) { }

    public getComments(postId: string, dataRequested: boolean, commentsCount: number) {
        if (commentsCount === 0) {
            this.comments = [];
            setTimeout(() => this.comments$.next([]), 1);
        } else if (!dataRequested) {
            this.http
                .get(this.apiService.getCommentsUrl(postId))
                .map(res => res.json())
                .subscribe(data => {
                    this.comments = data.map(comment => {
                        return comment;
                    });
                    this.comments$.next(this.comments);
                });
        }

        return this.comments$;
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
            .do(data => {
                const comment = data.json();
                comment.dataRequested = true;
                this.comments.push(comment);

                this.comments$.next(this.comments);
            });
    }

    public removeComment(postId: string, commentId: string) {
        return this.http.request(this.apiService.getChangeCommentsUrl(postId, commentId), {
            body: '',
            method: 'DELETE'
        })
            .do(data => {
                this.comments = this.comments.filter(comment => comment.id != commentId);

                this.comments$.next(this.comments);
            });
    }

    public updateComment(commentId: string, postId: string, comment: string) {
        const body = {
            comment
        };

        return this.http.request(this.apiService.getChangeCommentsUrl(postId, commentId), {
            body,
            method: 'PUT'
        })
            .do(data => {
                const comment = data.json();
                comment.dataRequested = true;
                this.comments = this.comments.map(currentComment => {
                    if (currentComment.id === comment.id) {
                        return Object.assign(currentComment, comment);
                    }

                    return currentComment;
                });

                this.comments$.next(this.comments);
            });
    }

    public setSelectedComment(comment: any) {
        this.selectedComment = comment;
    }

    public getSelectedComment() {
        return this.selectedComment;
    }
}