import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, API } from '../index';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

import { Actor } from './stream.model';

@Injectable()
export class StreamService  {
    private posts$ = new Subject();
    private following$ = new Subject();

    constructor(private http: Http, private apiService: ApiService) {
     }

    public getData(actor: Actor, streamType: string, limit: number = 20) {
        // get the token for getStream timeline call
        this.getToken(actor).subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed(actor.actorType, actor.actorId, token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar[streamType]({ limit }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                this.handlePostsRequest(data);
            });
        });

        return this.posts$;
    }

    public getUserFollowing$(actor?: Actor) {
        // get the token for getStream timeline call
        this.getToken(actor).subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed(actor.actorType, actor.actorId, token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar.following({ limit: 20 }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                this.following$.next(data.results);
            });
        });

        return this.following$;
    }

    private getToken(actor: Actor) {
        return this.http.request(this.apiService.getTokenUrl(), {
            body: actor,
            method: 'POST'
        })
            .map((res: any) => {
                return res.json().token;
            });
    }

    private handlePostsRequest(data) {
        const posts = data.results.map(item => {
            // format all Object keys to lowercase
            const postObject: any = _.mapKeys(item.Target, (currentItem, currentKey: string) => {
                return currentKey[0].toLowerCase() + currentKey.substr(1);
            });
            postObject.type = item.object;

            return postObject;
        });

        this.posts$.next(posts);
    }
}