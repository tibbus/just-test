///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap}        from 'angular2/platform/browser';
import {AppComponent}     from './app/app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import 'rxjs/Rx';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);