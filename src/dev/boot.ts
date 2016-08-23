/// <reference path="../../typings/index.d.ts" />

import 'rxjs/Rx';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app.component';
import { CustomRequestOptions } from './app/services/http/baseRequest';
import { appRouterProviders }   from './app/app.routes';

//enableProdMode();

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS
]);