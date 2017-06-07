import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';

@Injectable()
export class AuthService {
    private mgr: any;
    private user;
    private config: any;
    private authData;

    constructor() {
        this.config = {
            authority: "http://logbookidentity.azurewebsites.net",
            client_id: "mycarbiowebapp",
            redirect_uri: `${window.location.origin}/callback.html`,
            response_type: "id_token token",
            scope: "openid profile mycarbioapi",
            post_logout_redirect_uri: `${window.location.origin}`,
            // default value
            acr_values: 'idp:Facebook'
        };

        this.mgr = new UserManager(this.config);
    }

    public setUser() {
        const promise = this.mgr.getUser();

        promise.then(authData => {
            if (authData) {
                console.log(authData);
                // @todo : Talk with the BE to make the user format the same as the Profile one
                this.authData = authData;
                this.user = authData.profile;
                this.user.route = this.getRouteFromUser(this.user.name, this.user.id);

                console.log("User logged in");
            }
            else {
                console.log("User not logged in");
                // use default user
            }
        });

        return promise;
    }

    public getAuthData() {
        return this.authData;
    }

    public getUser() {
        return this.user;
    }

    public isUserLoggedIn(): boolean {
        return !!this.user;
    }

    public signIn(socialMediaType: string) {
        this.config.acr_values = `idp:${socialMediaType}`;
        this.mgr = new UserManager(this.config);

        return this.mgr.signinRedirect();
    }

    public signOut() {
        return this.mgr.signoutRedirect();
    }

    public isUserAuth(userId: string) {
        return this.user.id == userId;
    }

    // @todo Find a way to share this method with the Profile Service
    private getRouteFromUser(name: string, id: string) {
        const formattedName: string = name.replace(/ /g, '');

        return `${formattedName}-${id}`;
    }
}
