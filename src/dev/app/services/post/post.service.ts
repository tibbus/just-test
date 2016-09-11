import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../http/http.service';
import { ApiService, API } from '../api/api.service';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

declare const LE: any;

@Injectable()
export class PostService {
    private _topics: string[];
    private _postMedia = new Subject<any>();
    postMedia$ = this._postMedia.asObservable();

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

        const apiUrl: string = this.apiService.getAddPostUrl(this.carService.userCarId, postType);
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
            url: apiUrl,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(() => {
            this._postMedia.next('done');
        }).fail(function (jqXHR, exception) {
            LE.log(`Error trying to access:  ${this.url} with error message of: ${jqXHR.status} ${jqXHR.responseText}`);
        })

        return this.postMedia$;
    }

    addStatus(newStatus: string) {
        const apiUrl = this.apiService.getAddPostUrl(this.carService.userCarId, 'status');
        const body: any = {
            description: newStatus,
            topics: this._topics
        };

        return this.http.request(apiUrl, {
            body: JSON.stringify(body),
            method: 'POST'
        });
    }

    updatePost(updatedDescription, updatedFiles, updatedTopics) {
        const postType: string = this.timelineService.selectedPost.type;
        const apiUrl: string = this.apiService.getUpdatePostUrl(this.carService.userCarId, postType.toLocaleLowerCase(), this.timelineService.selectedPostId);

        // Use angular2 http service for the Status and Jquery.Ajax for formData requests
        if (postType === 'Status') {
            const body: any = {
                id: this.apiService.userId,
                description: updatedDescription,
                topics: updatedTopics
            };

            return this.http.request(apiUrl, {
                body: JSON.stringify(body),
                method: 'PUT'
            });
        } else {
            const formData = new FormData();

            for (let file of updatedFiles) {
                formData.append('files', file);
            }
            for (let topic of updatedTopics) {
                formData.append('topics', topic);
            }
            formData.append('location', 'test');
            formData.append('description', updatedDescription);

            jQuery.ajax({
                url: apiUrl,
                type: 'PUT',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(() => {
                    this._postMedia.next('done')
            }).fail(function (jqXHR, exception) {
                LE.log(`Error trying to access:  ${this.url} with error message of: ${jqXHR.status} ${jqXHR.responseText}`);
            })

            return this.postMedia$;
        }
    }

    deletePost(postId: string) {
        const apiUrl = `${API.root}/car/${this.carService.userCarId}/status/${postId}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }

    set topics(topics: string[]) {
        this._topics = topics;
    }
}