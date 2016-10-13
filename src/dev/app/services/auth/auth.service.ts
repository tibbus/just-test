import { Injectable } from '@angular/core';

import * as Oidc from 'oidc-client';

@Injectable()
export class AuthService {
   private mgr: any;

   constructor() {
       const config = {
            authority: "http://mycarbioidentity.azurewebsites.net/",
            client_id: "mycarbiowebapp",
            redirect_uri: `${window.location.origin}/callback.html`,
            response_type: "id_token token",
            scope: "openid profile mycarbioapi",
            post_logout_redirect_uri: `${window.location.origin}/callback.html`,
        };

        this.mgr = new Oidc.UserManager(config);
   }

   getUser() {
       return this.mgr.getUser();
   }

   signIn() {
       return this.mgr.signinRedirect();
   }

   signOut() {
       return this.mgr.signoutRedirect();
   }
}
