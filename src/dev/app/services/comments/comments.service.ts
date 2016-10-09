import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API } from '../index';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class CommentsService  {

    private selectedComment: any;

    constructor(private http: Http, private apiService: ApiService) { }

    getComments(postId: string) {
        return this.http
            //.get(this.apiService.getCommentUrl('91'))
            .get(`http://mycarbioservice-api.azurewebsites.net/api/v1/timeline/${postId}/comment`)
            .map(res => res.json());
    }

    addComment(postId: string, commentText: string) {
        const body = {
            'authorUserId': this.apiService.userId,
            'recipientUserId': this.apiService.userId,
            'comment': commentText
        };

        return this.http.request(`http://mycarbioservice-api.azurewebsites.net/api/v1/timeline/${postId}/comment`, {
                body,
                method: 'POST'
            })
            .do(data => console.log(data))
    }

    removeComment(postId: string, commentId: string) {
        const body = '';

        return this.http.request(`http://mycarbioservice-api.azurewebsites.net/api/v1/timeline/${postId}/comment/${commentId}`, {
                body: '',
                method: 'DELETE'
            })
            .do(data => console.log(data))
    }

    updateComment(postId: string, commentId: string, comment: string) {
        const body = {
            comment
        };
        
        return this.http.request(`http://mycarbioservice-api.azurewebsites.net/api/v1/timeline/${postId}/comment/${commentId}`, {
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