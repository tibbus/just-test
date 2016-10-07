import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API } from '../index';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class CommentsService  {

    constructor(private http: Http, private apiService: ApiService) { }

    getComments(postId: string) {
        return this.http
            //.get(this.apiService.getCommentUrl('91'))
            .get(`http://mycarbioservice-api.azurewebsites.net/api/v1/timeline/${postId}/comment`)
            .map(res => res.json());
    }

    addComment(post: any) {
        const body = {
            'authorUserId': this.apiService.userId,
            'recipientUserId': this.apiService.userId,
            'comment': post.comments.newComment
        };

        return this.http.request(`http://mycarbioservice-api.azurewebsites.net/api/v1/timeline/${post.id}/comment`, {
                body: body,
                method: 'POST'
            })
            .do(data => console.log(data))
    }
}