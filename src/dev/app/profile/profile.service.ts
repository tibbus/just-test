import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    private _url: string = 'http://amilatestapi.azurewebsites.net/api/v1/user/1';  // URL to web api

    getProfile() {
        return this.http.get(this._url)
            .toPromise()
            .then(res => res.json(), this.handleError)
            .then(data => { console.log(data); return data; }); // eyeball results in the console
    }

    private handleError(error: any) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }
}