import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import * as _ from 'lodash';

@Injectable()
export class TimelineService extends HttpService {
    constructor(private http: Http, private apiService: ApiService, private carService: CarService) {
        super(http, `/timeline/${carService.userCarId}`);
    }

    private statuses: any[];
    private _selectedPostId: any;
    private _selectedImageIndex: number;

    getPosts(forceRefresh?: boolean) {
        return this.getData(forceRefresh).map((res: any) => {
            this.statuses = res.results;    

            return res;
        });
    }

    getPostById(id: string) {
        return _.find(this.statuses, {
            details: { id: id }
        });
    }

    set selectedPostId(id) {
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