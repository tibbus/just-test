import { Component, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';

@Component({
    selector: 'auth',
    styleUrls: ['./authCallback.component.scss'],
    templateUrl: './authCallback.component.html'
})

export class AuthCallbackComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        new UserManager({}).signinRedirectCallback()
            .then(() => {
                // @todo Investigate if it's a better way to hande the route without id
                (window as any).location = "/garage/authentication";
            }).catch(function (e) {
                console.error(e);
            });
    }
}