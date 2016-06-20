import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MediaService {
    constructor(private http: Http, private apiService: ApiService, private carService: CarService, private timelineService: TimelineService) {
        //super(http, `/car/${carService.userCarId}/status`);
    }

    private _postMedia = new Subject<any>();
    postMedia$ = this._postMedia.asObservable();

    addStatus(files: any[], statusText: string) {
        const apiUrl = `/car/${this.carService.userCarId}/image`;
        //const body: any = {
        //    description: newStatus,
        //    topics: ["Suzuki"]
        //};

        console.log(apiUrl)
        const formData = new FormData();

        formData.append('topics', 'test');
        formData.append('location', 'test');
        formData.append('description', statusText);

        for (let file of files) {
            formData.append('files', file);
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

        //this.http.post('https://contactsapi.apispark.net1/v1/companies', formData);

        //return this.http.request(apiUrl, {
        //    body: JSON.stringify(formData),
        //    method: 'POST'
        //});
    }
}