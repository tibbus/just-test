import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../api/api.service';
import { API } from '../api/api';
import { Actor } from './stream.model';

@Injectable()
export class StreamService  {
    private posts$ = new Subject();

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

    public getActorFollowing(actor?: Actor) {
        let follows$ = new Subject();

        // get the token for getStream timeline call
        this.getToken(actor).subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed(actor.actorType, actor.actorId, token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar.following({ limit: 20 }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                follows$.next(data.results);
            });
        });

        return follows$;
    }

    // @TODO merge this function with the following one
    public getCarFollowers(actor: Actor) {
        let followers$: Subject<any[]> = new Subject();

        // get the token for getStream timeline call
        this.getToken(actor).subscribe(token => {
            // set the getStream settings
            const streamClient: any = this.apiService.getStreamClient();
            const streamCar = streamClient.feed(actor.actorType, actor.actorId, token);

            // make the call request for the timeline
            const carTimelineRequest = streamCar.followers({ limit: 20 }).then(data => {
                // Callback function when we recive data, will call .next on the Observer
                followers$.next(data.results);
            });
        });

        return followers$;
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
            const post = item.Target;
            post.type = item.object;

            return post;
        });

        this.posts$.next(posts);
    }
}