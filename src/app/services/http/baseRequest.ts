import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { API } from '../api/api';

export class CustomRequestOptions extends BaseRequestOptions {
    merge(options?: RequestOptionsArgs): RequestOptions {
        // TODO : create an Interface or Enum with the request types
        if (options.method === 1 || options.method === 2 || options.method === 3) {
            let headers: any = options.headers || {};
            headers['Content-Type'] = 'application/json';

            options.headers = headers;
        }

        return super.merge(options);
    }
}
