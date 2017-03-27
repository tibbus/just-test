import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';

import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
   private mgr: any;

   constructor(private apiService: ApiService) {
       const config = {
            authority: "http://mycarbioidentity.azurewebsites.net/",
            client_id: "mycarbiowebapp",
            redirect_uri: `${window.location.origin}/callback.html`,
            response_type: "id_token token",
            scope: "openid profile mycarbioapi",
            post_logout_redirect_uri: `${window.location.origin}`,
            acr_values: 'idp:Facebook'
        };

        this.mgr = new UserManager(config);
   }

   getUser() {
       const promise = this.mgr.getUser();

       promise.then( user => {
            if (user) {
                console.log("User logged in", user);

                this.apiService.setUser(user.profile.id);
            }
            else {
                console.log("User not logged in");
                // use default user
            }
        });

       return promise;
   }

   signIn() {
       return this.mgr.signinRedirect();
   }

   signOut() {
       return this.mgr.signoutRedirect();
   }
}
