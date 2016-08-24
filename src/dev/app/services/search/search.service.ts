import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class SearchService {
    constructor(private http: Http, private apiService: ApiService) {
    }

    public hasData: boolean = true;

    search(term: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('api-key', `A57CC5AE46C3EE7955EC441AEEBAF4F0`);

        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(`https://amilatest.search.windows.net/indexes/carinfo/docs?api-version=2015-02-28&search=${term}*`, options)
            .map(res => res.json().value)
            .do(data => {
                this.hasData = !!data.length;
            })
    }
}