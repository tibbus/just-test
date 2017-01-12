import { Component, OnInit } from '@angular/core';
import * as Oidc from 'oidc-client';

// ignore oidc typings
const fixOidc: any = Oidc;

@Component({
    selector: 'auth',
    styleUrls: ['./auth.component.scss'],
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
        new fixOidc.UserManager().signinRedirectCallback().then(function () {
            (window as any).location = "/garage";
        }).catch(function (e) {
            console.error(e);
        });
    }
}