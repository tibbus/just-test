import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { ApiService } from '../api/api.service';
import { API } from '../api/api';

@Injectable()
export class LikesService {
    private likes$ = new Subject();
    private likes: any[] = [];

    constructor(
        private http: Http,
        private apiService: ApiService,
        @Inject('likesType') public likesType: string
    ) { }

    public getLikes(postId: string, dataRequested = false, likesCount?) {
        if (likesCount === 0) {
            this.likes = [];
            setTimeout(() => this.likes$.next([]), 1);
        } else if (!dataRequested) {
            const likes$ = this.http.get(this.apiService.getLikesUrl(this.likesType, postId))
                .map(res => res.json())
                .catch(this.handleError)
                .subscribe(data => {
                    this.likes = data;
                    this.likes$.next(this.likes);
                })
        }

        return this.likes$;
    }

    public likePost(postId: string) {
        // If user already likes the post then unlike it
        if (this.isCurrentUserLike()) {
            const userLikeId = this.getUserLike().id;

            return this.http.delete(this.apiService.getRemoveLikeUrl(userLikeId, this.likesType)).do(() => {
                this.likes = this.likes.filter(like => {
                    return like.id != userLikeId;
                });
                this.likes$.next(this.likes);
            });;
        }

        return this.http.post(this.apiService.getAddLikeUrl(), {
            postId,
            postType: this.likesType,
            userId: this.apiService.getUserId()
        })
            .map(res => res.json())
            .do(like => {
                this.likes.push(like);
                this.likes$.next(this.likes);
            });
    }

    public isCurrentUserLike() {
        return !!this.getUserLike();
    }

    private getUserLike() {
        return this.likes.find(like => {
            return like.userId == this.apiService.getUserId()
        });
    }

    // When the items has no likes return 0
    private handleError() {
        return Observable.of([]);
    }
}