import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API, HttpService } from '../index';
import { Timeline, Post } from './timeline';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimelineService {
    constructor(
        private http: Http, 
        private apiService: ApiService, 
        private carService: CarService
    ) {}

    public posts: Post[];
    private _selectedPostId: string;
    private _selectedImageIndex: number;
    private posts$ = new Subject();
    public actor: any;

    getPosts() {
        // get the token for getStream timeline call
        this.getToken().subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed(this.actor.actorType, this.actor.actorId, token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar.get({ limit: 20 }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                this.handlePostsRequest(data);
            });
        });

        return this.posts$;
    }

    getToken() {
        return this.http.request(this.apiService.getTokenUrl(), {
            body: this.actor,
            method: 'POST'
        })
        .map((res: any) => {
            return res.json().token;
        });
    }

    handlePostsRequest(data) {
        this.posts = data.results.map(item => {
            // format all Object keys to lowercase
            const postObject: any = _.mapKeys(item.Target, (currentItem, currentKey: string) => {
                return currentKey[0].toLowerCase() + currentKey.substr(1);
            });
            postObject.type = item.object;

            return postObject;
        });

        this.posts$.next(this.posts);
    }

    getPostById(id: string): any {
        return _.find(this.posts, { id });
    }

    set selectedPostId(id: string) {
        this._selectedPostId = id;
    }

    set selectedImage(index: number) {
        this._selectedImageIndex = index;
    }

    get selectedPostId() {
        return this._selectedPostId;
    }

    get selectedPost() {
        return this.getPostById(this.selectedPostId);
    }

    get selectedImage() {
        return this._selectedImageIndex;
    }
}