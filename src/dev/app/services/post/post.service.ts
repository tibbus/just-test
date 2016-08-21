import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../http/http.service';
import { ApiService, API } from '../api/api.service';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    private _topics: string[];
    private _postMedia = new Subject<any>();
    postMedia$ = this._postMedia.asObservable();
    private urlRoot: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1/car/';

    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private timelineService: TimelineService
    ) { }

    addPost(files: any[], statusText: string, postType: string) {
        if (postType === 'status') {
            return this.addStatus(statusText);
        }

        const formData = new FormData();

        // Add form data :
        formData.append('location', 'test');
        formData.append('description', statusText);
        for (let file of files) {
            formData.append('files', file);
        }
        for (let topic of this._topics) {
            formData.append('topics', topic);
        }

        jQuery.ajax({
            url: `${API.root}/car/${this.carService.userCarId}/${postType}`,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(() => {
            this._postMedia.next('done')
        });

        return this.postMedia$;
    }

    addStatus(newStatus: string) {
        const apiUrl = `/car/${this.carService.userCarId}/status`;
        const body: any = {
            description: newStatus,
            topics: this._topics
        };

        return this.http.request(apiUrl, {
            body: JSON.stringify(body),
            method: 'POST'
        });
    }

    updatePost(newStatus: string) {
        const postType: string = this.timelineService.selectedPost.type;

        // Use angular2 http service for the Status and Jquery.Ajax for formData requests
        if (postType === 'Status') {
            const apiUrl = `/car/${this.carService.userCarId}/status/${this.timelineService.selectedPostId}`;
            const body: any = {
                id: 1,
                description: newStatus,
                topics: ["Suzuki"]
            };

            return this.http.request(apiUrl, {
                body: JSON.stringify(body),
                method: 'PUT'
            });
        } else {
            const formData = new FormData();

            this._topics = ['new topic', 'test another'];

            for (let topic of this._topics) {
                formData.append('topics', topic);
            }
            formData.append('location', 'test');
            formData.append('description', 'some description');

            jQuery.ajax({
                url: `${API.root}/car/${this.carService.userCarId}/${postType}/${this.timelineService.selectedPostId}`,
                type: 'PUT',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(() => {
                this._postMedia.next('done')
            });

            return this.postMedia$;
        }
    }

    deletePost(postId: string) {
        const apiUrl = `/car/${this.carService.userCarId}/status/${postId}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }

    set topics(topics: string[]) {
        this._topics = topics;
    }
}