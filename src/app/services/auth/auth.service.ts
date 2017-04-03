import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';

import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
   private mgr: any;
   private user;
   private config: any;

   constructor(private apiService: ApiService) {
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

       promise.then( user => {
            if (user) {
                this.user = user;
                console.log("User logged in");

                this.apiService.setUser(this.user.profile.id);
            }
            else {
                console.log("User not logged in");
                // use default user
            }
        });

       return promise;
   }

   public getUser() {
       return this.user;
   }

   public signIn(socialMediaType: string) {
        this.config.acr_values = `idp:${socialMediaType}`;
        this.mgr = new UserManager(this.config);

       return this.mgr.signinRedirect();
   }

   public signOut() {
       return this.mgr.signoutRedirect();
   }
}
