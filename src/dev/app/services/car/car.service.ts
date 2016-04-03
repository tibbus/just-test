import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}       from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    private _url: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1/usercar/details=true';

    getCars() {
        return this.http
            .get(this._url)
            .map(res => <any>res.json())
            .do(data => console.log(data)) // eyeball results in the console
    }

    // Error handle inside the component
    private handleError(error: Response) {
        return Observable.throw(error.text() || 'Server error');
    }
}