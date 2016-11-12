import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { API } from '../api/api';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

declare const LE: any;

@Injectable()
export class PostService {
    private topics: string[];

    constructor(
        private http: Http,
        private apiService: ApiService,
        private carService: CarService,
        private timelineService: TimelineService
    ) { }

    public addPost(files: any[], statusText: string, postType: string) {
        if (postType === 'status') {
            return this.addStatus(statusText);
        }

        const apiUrl: string = this.apiService.getAddPostUrl(this.carService.selectedCar.id, postType);
        const formData = new FormData();

        // Add form data :
        formData.append('location', 'test');
        formData.append('description', statusText);
        for (let file of files) {
            formData.append('files', file);
        }
        for (let topic of this.topics) {
            formData.append('topics', topic);
        }

        return this.http.post(apiUrl, formData);
    }

    private addStatus(newStatus: string) {
        const apiUrl = this.apiService.getAddPostUrl(this.carService.selectedCar.id, 'status');
        const body: any = {
            description: newStatus,
            topics: this.topics
        };

        return this.http.request(apiUrl, {
            body: JSON.stringify(body),
            method: 'POST'
        });
    }

    public updatePost(updatedDescription, updatedFiles, updatedTopics) {
        const postType: string = this.timelineService.getSelectedPost().type;
        const apiUrl: string = this.apiService.getUpdatePostUrl(this.carService.selectedCar.id, postType.toLocaleLowerCase(), this.timelineService.getSelectedPostId());

        if (postType === 'Status') {
            const body: any = {
                id: this.apiService.getUserId(),
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

            return this.http.put(apiUrl, formData);
        }
    }

    public deletePost(postId: string) {
        const apiUrl = `${API.root}/car/${this.carService.selectedCar.id}/status/${postId}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }

    public setTopics(topics: string[]) {
        this.topics = topics;
    }
}