import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { CarService } from '../car/car.service';
import * as _ from 'lodash';

@Injectable()
export class StatusService extends HttpService {
    constructor(private http: Http, private apiService: ApiService, private carService: CarService) {
        super(http, `/car/${carService.userCarId}/status`);
    }

    private currentStatusId: string;

    getStatus(forceRefresh?: boolean) {
        return this.getData(forceRefresh).map((res: any[]) => {
            const status = res[res.length - 1];

            this.currentStatusId = status.Id;

            return status;
        });
    }

    updateStatus(newStatus: string) {
        const apiUrl = `/car/${this.carService.userCarId}/status/${this.currentStatusId}`;
        const body: any = {
            Id: 1,
            Description: newStatus,
            Topics: ["Suzuki"]
        };

        return this.http.request(apiUrl, {
            body: JSON.stringify(body),
            method: 'PUT'
        });
    }

    removeStatus(id: string) {
        const apiUrl = `/car/1/status/21`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }
}