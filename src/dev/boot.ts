/// <reference path="../../node_modules/angular2/typings/browser.d.ts"/>
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/bootstrap-material-design/bootstrap-material-design.d.ts" />

import 'rxjs/Rx';
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, RequestOptions} from 'angular2/http';

import {AppComponent} from './app/app.component';
import {CustomRequestOptions} from './app/common/httpService/baseRequest';
import {ProfileService} from './app/services/profile/profile.service';
import {CarService} from './app/services/car/car.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(RequestOptions, { useClass: CustomRequestOptions }),
    ProfileService,
    CarService
]);