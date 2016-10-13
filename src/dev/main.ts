/// <reference path="../../typings/index.d.ts" />

import 'rxjs/Rx';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import * as Oidc from 'oidc-client';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);

var config = {
    authority: "http://mycarbioidentity.azurewebsites.net/",
    client_id: "mycarbiowebapp",
    redirect_uri: "http://localhost:5000/callback.html",
    response_type: "id_token token",
    scope: "openid profile mycarbioapi",
    post_logout_redirect_uri: "http://localhost:5000/index.html",
};

var mgr = new Oidc.UserManager(config);

window.mgr = mgr;

mgr.getUser().then(function (user) {
    if (user) {
        console.log("User logged in", user.profile);
    }
    else {
        console.log("User not logged in");
        //login();
    }
});

function login() {
    mgr.signinRedirect();
}
