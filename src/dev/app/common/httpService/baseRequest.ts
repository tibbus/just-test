import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from 'angular2/http';

export class CustomRequestOptions extends BaseRequestOptions {
    
    // DEV Enviroment
    //private _baseApiUrl: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1';
    
    // PROD Enviroment
    //private _baseApiUrl: string = 'http://amilatestapi-prod.azurewebsites.net/api/v1';
    
    // Local FAKE Service Enviroment 
    private _baseApiUrl: string = `${window.location.origin}/api/v1`;

    merge(options?: RequestOptionsArgs): RequestOptions {
        options.url = this._baseApiUrl + options.url;

        return super.merge(options);
    }
}