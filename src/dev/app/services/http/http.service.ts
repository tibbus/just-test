import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/Rx';
import { API } from '../api/api.service';
import { Observable } from 'rxjs';

declare const LE: any;

export abstract class HttpService {
    constructor(private _http: Http, public url: string) { console.log(BehaviorSubject) }

    private _dataObs = new ReplaySubject(1);
    public dataObject; 

    private getDataFromHttp() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: '' });

        return this._http
            .get(`${API.root}${this.url}`, options)
            .map(res => res.json())
            .do(data => {
                console.log(data);
            })
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
                    LE.log(`Error trying to access: ${API.root}${this.url}`);

                    this._dataObs.error(error);
                });
        }

        return this._dataObs;
    }
}