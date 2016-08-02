/// <reference path="../../typings/index.d.ts" />

import 'rxjs/Rx';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app.component';
import { appRouterProviders }   from './app/app.routes';
import { CustomRequestOptions } from './app/services/http/baseRequest';
import {
    ApiService,
    CarService,
    ProfileService,
    SidebarService,
    ModalService,
    PostService,
    TimelineService
} from './app/services/index';

//enableProdMode();

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    provide(RequestOptions, { useClass: CustomRequestOptions }),
    ProfileService,
    CarService,
    SidebarService,
    ModalService,
    ApiService,
    TimelineService 
]);