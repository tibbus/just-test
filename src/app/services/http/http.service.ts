import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { API } from '../api/api';

declare const LE: any;

export abstract class HttpService {
    constructor(private _http: Http, public url: string) { }

    private dataObs$ = new ReplaySubject(1);
    public dataObject;

    private getDataFromHttp() {
        return this._http
            .get(this.url)
            .map(res => res.json());
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

                    // Create a new Observable as on Error the Observable becames innactive
                    this.dataObs$ = new ReplaySubject(1);
                });
        }

        return this.dataObs$;
    }
}