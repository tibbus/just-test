import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';

export class CustomRequestOptions extends BaseRequestOptions {
    
    // DEV Enviroment
    //private _baseApiUrl: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1';
    
    // PROD Enviroment
    //private _baseApiUrl: string = 'http://amilatestapi-prod.azurewebsites.net/api/v1';
    
    // Local FAKE Service Enviroment 
    private _baseApiUrl: string = `${window.location.origin}/api/v1`;

    merge(options?: RequestOptionsArgs): RequestOptions {
        options.url = this._baseApiUrl + options.url;

        // TODO : create an Interface or Enum with the request types
        if (options.method === 1 || options.method === 2 || options.method === 3) {
            let headers: any = options.headers || {};
            headers['Content-Type'] = 'application/json';

            options.headers = headers;
        }

        return super.merge(options);
    }
}