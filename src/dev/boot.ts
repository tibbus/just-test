/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/bootstrap-material-design/bootstrap-material-design.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/browser/ambient/es6-shim/index.d.ts" />

import 'rxjs/Rx';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, RequestOptions} from '@angular/http';

import {AppComponent} from './app/app.component';
import {CustomRequestOptions} from './app/common/httpService/baseRequest';
import {ProfileService} from './app/services/profile/profile.service';
import {CarService} from './app/services/car/car.service';
import {SidebarService} from './app/views/sidebar/sidebar.service';
import {ModalService} from './app/common/modal/modal.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(RequestOptions, { useClass: CustomRequestOptions }),
    ProfileService,
    CarService,
    SidebarService,
    ModalService
]);