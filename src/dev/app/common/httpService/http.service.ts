import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {ReplaySubject}    from 'rxjs/subject/ReplaySubject';

export abstract class HttpService {
    constructor(private _http: Http, public url: string) { }

    private _dataObs = new ReplaySubject(1);
    private _firstTimeRequest: boolean = true;
    private _dataObject; 

    private getDataFromHttp() {
        return this._http
            .get(this.url)
            .map(res => res.json())
            .do(data => {
                console.log(data);
            });
    }

    getData(forceRefresh?: boolean) {
        if (this._firstTimeRequest || forceRefresh) {
            this.getDataFromHttp().subscribe(
                data => {
                    this._firstTimeRequest = false;

                    this._dataObject = data;

                    this._dataObs.next(data);
                },
                error => {
                    console.log(error);

                    this._dataObs.error(error);
                });
        }

        return this._dataObs;
    }
}