import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { API } from '../api/api';
import { Letters } from './verify.model';

@Injectable()
export class VerifyService {
    private verify$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: Http) {
    }

    public verify(carInfoId: string, userId: string, letters: Letters) {
        const url = `${API.root}/user/${userId}/usercar/${carInfoId}/verify`;

        return this.http.post(url, letters)
            .map(response => response.json())
            .do(response => {
                if (response.verified) {
                    this.verify$.next(true);
                }
            });
    }

    public getVerify() {
        return this.verify$;
    }
}