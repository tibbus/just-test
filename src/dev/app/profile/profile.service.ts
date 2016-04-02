import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Profile} from './profile';
import {Observable}       from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    private _url: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1';

    getProfile() {
        return this.http
            .get(this._url)
            .map(res => <Profile>res.json())
            .do(data => console.log(data)) // eyeball results in the console
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

    // Error handle inside the component
    private handleError(error: Response) {
        return Observable.throw(error.text() || 'Server error');
    }
}