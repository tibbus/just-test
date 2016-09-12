import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, CarService, API } from '../index';

@Injectable()
export class FollowService  {
    constructor(private http: Http, private apiService: ApiService, private carService: CarService) { }

    followCar() {
        return this.http.request(this.apiService.getFollowUrl(this.carService.selectedCar.id), {
            body: '',
            method: 'POST'
        });
    }

    unFollowCar() {
        return this.http.request(this.apiService.getUnFollowUrl(this.carService.selectedCar.id), {
            body: '',
            method: 'POST'
        });
    }
}