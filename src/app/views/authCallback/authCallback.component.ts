import { Component, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';

@Component({
    selector: 'auth',
    styleUrls: ['./authCallback.component.scss'],
    templateUrl: './authCallback.component.html'
})

export class AuthCallbackComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
        new UserManager({}).signinRedirectCallback().then(function () {
            (window as any).location = "/garage";
        }).catch(function (e) {
            console.error(e);
        });
    }
}