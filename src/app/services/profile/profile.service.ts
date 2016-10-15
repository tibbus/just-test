import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Profile} from './profile';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpService } from '../http/http.service';
import { ApiService, API } from '../api/api.service';

@Injectable()
export class ProfileService extends HttpService {
    constructor(private http: Http, private apiService: ApiService) {
        super(http, apiService.getProfileUrl());
    }

    getProfile() {
        return this.getData();
    }

    setProfile(profile: Profile) {
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
}