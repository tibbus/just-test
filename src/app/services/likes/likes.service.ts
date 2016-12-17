import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ApiService, API } from '../index';

@Injectable()
export class LikesService {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) { }

    public getPostsLikesCount(posts: any[]) {
        // extract the post IDs in to an Array
        const ids = posts.map(post => {
            return post.activityData.id;
        });
        const obs: Observable<any>[] = [];

        // Make a http request for each post and map the likes to it
        ids.forEach(id => {
            obs.push(this.http.get(this.apiService.getLikesUrl('timeline', id)).map(res => res.json()).catch(this.handleError));
        })

        return Observable.forkJoin(obs).map(likes => {
            return posts.map((post, index) => {
                post.likes = {
                    list: likes[index],
                    count: likes[index].length,
                    isCurrentUserLike: !!this.getCurrentUserLike(likes[index])
                }

                return post;
            })
        });
    }

    // Return an empty array [] as BE is bugged and returns and error when are 0 likes instead of []
    private handleError(error: any) {
        console.log('error');
        return Observable.of([]);
    }

    private getCurrentUserLike(likes) {
        return _.find(likes, (likeObj: any) => {
            // Not explecit as id from BE can be a number
            return likeObj.userId == this.apiService.getUserId()
        });
    }

    public likePost(postId: string, postType: string, likes: any = {}) {
        // If user already likes the post then unlike it
        // BE api doesn't work for this yet
        if (likes.isCurrentUserLike) {
            const currentUserLikeId = this.getCurrentUserLike(likes.list).id;

            return this.http.delete(this.apiService.getRemoveLikeUrl(currentUserLikeId));
        }

        return this.http.post(this.apiService.getAddLikeUrl(), {
            postId,
            postType,
            userId: this.apiService.getUserId()
        });
    }
}