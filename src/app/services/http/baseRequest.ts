import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Inject } from '@angular/core';

import { API } from '../api/api';
import { AuthService } from '../auth/auth.service';

export class CustomRequestOptions extends BaseRequestOptions {
    constructor(@Inject(AuthService) private authService: AuthService) {
        super();
    }

    merge(options?: RequestOptionsArgs): RequestOptions {
        const token = this.authService.getAuthData().access_token;

        let headers: any = options.headers || {};
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = `Bearer ${token}`;

        options.headers = headers;

        return super.merge(options);
    }
}
