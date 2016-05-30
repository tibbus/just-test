import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import { TimelineService } from '../timeline/timeline.service';
import * as _ from 'lodash';

@Injectable()
export class StatusService extends HttpService {
    constructor(private http: Http, private apiService: ApiService, private carService: CarService, private timelineService: TimelineService) {
        super(http, `/car/${carService.userCarId}/status`);
    }

    addStatus(newStatus: string) {
        const apiUrl = `/car/${this.carService.userCarId}/status`;
        const body: any = {
            description: newStatus,
            topics: ["Suzuki"]
        };

        return this.http.request(apiUrl, {
            body: JSON.stringify(body),
            method: 'POST'
        });
    }

    updateStatus(newStatus: string) {
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
    }

    deleteStatus(statusId: string) {
        const apiUrl = `/car/${this.carService.userCarId}/status/${statusId}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }
}