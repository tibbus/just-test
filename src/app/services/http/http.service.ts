import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/Rx';
import { API } from '../api/api';
import { Observable } from 'rxjs';

declare const LE: any;

export abstract class HttpService {
    constructor(private _http: Http, public url: string) { }

    private dataObs$ = new ReplaySubject(1);
    public dataObject; 

    private getDataFromHttp() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: '' });

        return this._http
            .get(this.url, options)
            .map(res => res.json())
            .do(data => {
                console.log(data);
            })
    }

    public getData(forceRefresh?: boolean) {
        // If the Subject was NOT subscribed before OR if forceRefresh is requested 
        if (!this.dataObs$.observers.length || forceRefresh) {
            this.getDataFromHttp().subscribe(
                data => {
                    this.dataObject = data;

                    this.dataObs$.next(data);
                },
                error => {
                    LE.log(`Error trying to access: ${this.url}`);

                    this.dataObs$.error(error);
                });
        }

        return this.dataObs$;
    }
}