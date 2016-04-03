///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap-material-design/bootstrap-material-design.d.ts" />

import {bootstrap}        from 'angular2/platform/browser';
import {AppComponent}     from './app/app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import 'rxjs/Rx';
import {ProfileService} from './app/services/profile/profile.service';
import {HTTP_PROVIDERS}    from 'angular2/http';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, ProfileService]);