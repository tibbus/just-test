import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
        const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('api-key', `A57CC5AE46C3EE7955EC441AEEBAF4F0`);

        const options: RequestOptions = new RequestOptions({ headers: headers, body: '' });
        const apiUrl: string = this.apiService.getSearchUrl(term);

        return this.http
            .get(apiUrl, options)
            .map(res => res.json().value)
            .do(data => {
                this.hasData = !!data.length;
            })
    }
}