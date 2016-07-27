import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ImageService {
    private _topics: string[];
    private _postMedia = new Subject<any>();
    postMedia$ = this._postMedia.asObservable();
    
    constructor(private http: Http, private apiService: ApiService, private carService: CarService, private timelineService: TimelineService) {
        //super(http, `/car/${carService.userCarId}/status`);
    }

    addStatus(files: any[], statusText: string) {
        const formData = new FormData();

        formData.append('location', 'test');
        formData.append('description', statusText);

        for (let file of files) {
            formData.append('files', file);
        }
        for (let topic of this._topics) {
            formData.append('topics', topic);
        }

        jQuery.ajax({
            url: `http://amilatestapi-dev.azurewebsites.net/api/v1/car/${this.carService.userCarId}/image`,
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

    set topics(topics: string[]) {
        this._topics = topics;
    }
}