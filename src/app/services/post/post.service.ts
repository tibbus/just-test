import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { API } from '../api/api';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';

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

    public addPost(files: any[], statusText: string, postType: string, car) {
        this.topics.push(postType);
        this.topics.push(car.info.car.make);
        this.topics.push(car.info.car.model);

        if (postType === 'status') {
            return this.addStatus(statusText, car);
        }

        const apiUrl: string = this.apiService.getAddPostUrl(car.id, postType);
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

        return this.http.post(apiUrl, formData).do(data => this.timelineService.updateAfterPost(data.json(), car, postType));
    }

    private addStatus(newStatus: string, car) {
        const apiUrl = this.apiService.getAddPostUrl(car.id, 'status');
        const body: any = {
            description: newStatus,
            topics: this.topics
        };

        return this.http.request(apiUrl, {
            body: JSON.stringify(body),
            method: 'POST'
        }).do(data => this.timelineService.updateAfterPost(data.json(), car, 'status'));
    }

    public updatePost(updatedDescription, updatedFiles, updatedTopics, post) {
        const postType: string = this.timelineService.getSelectedPost().type;
        const apiUrl: string = this.apiService.getUpdatePostUrl(post.activityData.carInfoId, postType.toLocaleLowerCase(), post.activityData.id);

        if (postType === 'Status') {
            const body: any = {
                id: this.apiService.getUserId(),
                description: updatedDescription,
                topics: updatedTopics
            };

            return this.http.request(apiUrl, {
                body: JSON.stringify(body),
                method: 'PUT'
            }).do(data => this.timelineService.updateAfterEdit(data.json(), post));
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

            return this.http.put(apiUrl, formData).do(data => this.timelineService.updateAfterEdit(data.json(), post));
        }
    }

    public deletePost(postId: string, carInfoId: string) {
        const apiUrl = `${API.root}/car/${carInfoId}/status/${postId}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }

    public setTopics(topics: string[]) {
        this.topics = topics;
    }
}