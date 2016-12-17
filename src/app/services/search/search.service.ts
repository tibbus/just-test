import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class SearchService {
    constructor(private http: Http, private apiService: ApiService) {
    }

    // used directly in Search component template
    public hasData: boolean = true;
    private searchTermStream = new Subject();

    public getSearchResult(): Observable<string[]> {
        return this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term: string) => this.search(term))
    }

    public searchFor(term: string) {
        this.searchTermStream.next(term);
    }

    private search(term: string) {
        const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('api-key', `EEF193988CD5AA413BCDC29CDE38E90C`);

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