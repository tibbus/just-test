import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Profile} from './profile';
import {Observable}       from 'rxjs/Observable';
import {ReplaySubject}    from 'rxjs/subject/ReplaySubject';
import {HttpService} from './../../common/httpService/http.service';

@Injectable()
export class ProfileService extends HttpService{
    constructor(private http: Http) {
        super(http, '/user/1');
    }

    getProfile() {
        return this.getData();
    }

    setProfile(profile: Profile) {
        const body = JSON.stringify(profile);

        return this.http.request('/user/1', {
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