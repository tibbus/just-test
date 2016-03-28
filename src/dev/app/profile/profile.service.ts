import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Profile} from './profile';
import {Observable}       from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }

    private _url: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1';  // URL to web api

    getProfile() {
        return this.http
            .get(this._url)
            .map(res => <Profile>res.json())
            .do(data => console.log(data)) // eyeball results in the console
    }

    setProfile(profile: Profile) {
        //let body = JSON.stringify(profile);
        //let headers = new Headers({ 'Content-Type': 'application/json');
        //let options = new RequestOptions({ headers: headers });
        //    console.log('setting')

        return this.http.put(this._url, 'strigyfied json')
            .delay(2000)
            .map((res) => {
                console.log(res);
                <Profile>res.json()
            })
            .do(data => console.log(data)) // eyeball results in the console
            //.subscribe((data) => {
            //    console.log(data);
            //}, error => this.handleError(error));
        //jQuery.ajax({
        //    type: "PUT",
        //    crossDomain: true,
        //    url: this._url,
        //    data: profile
        //});

        //jQuery.ajax({
        //    type: "GET",
        //    url: 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1'
        //});
        //console.log(jQuery);

        //jQuery.ajax({
        //    type: "PUT",
        //    url: 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1',
        //    data: {
        //        "Id": 1,
        //        "Title": "Mr",
        //        "Name": "Testaa aaaaaaaaaaaa",
        //        "Email": "test.us1@emaissssl.com",
        //        "MobileNumber": "09876543",
        //        "HomeNumber": "01234567",
        //        "Line1": "1",
        //        "Line2": "Accom Road",
        //        "Town": "Newcastle upon Tyne",
        //        "PostCode": "NE1 2NN",
        //        "Country": "UK",
        //        "UserType": "Personal",
        //        "CreatedDate": "2016-03-23T23:28:52",
        //        "UpdatedDate": "2016-03-23T23:50:56"
        //    }
        //});
    }

    // Error handle inside the component
    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console

        return Observable.throw(error.text() || 'Server error');
    }
}