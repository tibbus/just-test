import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Profile} from './profile';
import {Observable}       from 'rxjs/Observable';
import {ReplaySubject}    from 'rxjs/subject/ReplaySubject';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    private _url: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1';
    private _profileObs = new ReplaySubject<Profile>(1);
    private _firstTimeRequest: boolean = true; 

    private getProfileFromHttp() {
        return this.http
            .get(this._url)
            .map(res => <Profile>res.json())
            .do(data => {
                console.log(data);
            });
    }

    getProfile(forceRefresh?: boolean) {
        if (this._firstTimeRequest || forceRefresh) {
            this.getProfileFromHttp().subscribe(
                profile => {
                    this._firstTimeRequest = false;

                    this._profileObs.next(profile);
                },
                error => {
                    console.log(error);

                    this._profileObs.error(error);
                });
        }

        return this._profileObs;
    }

    setProfile(profile: Profile) {
        let body = JSON.stringify(profile);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this._url, body, options)
            .map((res) => {
                console.log(res);
                <Profile>res.json()
            })
            .do(data => console.log(data))
    }
}