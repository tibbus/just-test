import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {ReplaySubject}    from 'rxjs/subject/ReplaySubject';

export abstract class HttpService {
    constructor(private _http: Http, public url: string) { }

    private _dataObs = new ReplaySubject(1);
    public dataObject; 

    private getDataFromHttp() {
        return this._http
            .get(this.url)
            .map(res => res.json())
            .do(data => {
                console.log(data);
            });
    }

    getData(forceRefresh?: boolean) {
        // On Error the Subject will be Stoped and Unsubscribed, if so, create another one
        this._dataObs = this._dataObs.isUnsubscribed ? new ReplaySubject(1) : this._dataObs;

        // If the Subject was NOT subscribed before OR if forceRefresh is requested 
        if (!this._dataObs.observers.length || forceRefresh) {
            this.getDataFromHttp().subscribe(
                data => {
                    this.dataObject = data;

                    this._dataObs.next(data);
                },
                error => {
                    this._dataObs.error(error);
                });
        }

        return this._dataObs;
    }
}