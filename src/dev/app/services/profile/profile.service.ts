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
        let body = JSON.stringify(profile);
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url, body, options)
            .map((res) => {
                console.log(res);
                <Profile>res.json()
            })
            .do(data => console.log(data))
    }
}