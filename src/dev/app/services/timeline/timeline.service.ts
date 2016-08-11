import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API, HttpService } from '../index';
import { Timeline, Post } from './timeline';
import * as _ from 'lodash';

@Injectable()
export class TimelineService extends HttpService {
    constructor(
        private http: Http, 
        private apiService: ApiService, 
        private carService: CarService
    ) {
        super(http, null);
    }

    private posts: Post[];
    private _selectedPostId: string;
    private _selectedImageIndex: number;

    getPosts(forceRefresh?: boolean) {
        // Set the url here as the Timeline should be initialized after the Car
        this.url = `${API.timeline}${this.carService.userCarId}`;

        return this.getData(forceRefresh).map((res: Timeline) => {
            this.posts = res.results;    

            return res;
        });
    }

    getPostById(id: string) {
        return _.find(this.posts, {
            details: { id }
        });
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