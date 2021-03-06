import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpService } from '../http/http.service';

import { Profile } from './profile.model';
import { ApiService } from '../api/api.service';
import { API } from '../api/api';

@Injectable()
export class ProfileService extends HttpService {
    constructor(private http: Http, private apiService: ApiService) {
        super(http, apiService.getProfileUrl());
    }

    public getProfile() {
        return this.getData().map((profile: any) => {
            profile.route = this.getRouteFromUser(profile.name, profile.id);

            return profile;
        });
    }

    public getUserByCar(carInfoId: string): Observable<any> {
        return this.http.get(`${API.root}/car/${carInfoId}/user`).map(res => {
            const profile = res.json();
            profile.route = this.getRouteFromUser(profile.name, profile.userId);

            return profile;
        });
    }

    public getUserById(userId: string): Observable<any> {
        return this.http.get(`${API.root}/user/${userId}`).map(res => res.json());
    }

    public setProfile(profile: Profile) {
        const body = JSON.stringify(profile);

        return this.http.request(this.apiService.getProfileUrl(), {
            body: body,
            method: 'PUT'
        })
            .map((res) => {
                console.log(res);
                <Profile>res.json()
            })
            .do(data => console.log(data))
    }

    private getRouteFromUser(name: string, id: string) {
        const formattedName: string = name.replace(/ /g, '');

        return `${formattedName}-${id}`;
    }
}