import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import { appRouterProviders }   from './app.routes';
import { AppComponent } from './app.component';

import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';

import {
    ApiService,
    CarService,
    ProfileService,
    SidebarService,
    ModalService,
    PostService,
    TimelineService
} from './services/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [AppComponent, HeaderComponent, SidebarComponent, ROUTER_DIRECTIVES],
    providers: [
        appRouterProviders,

        ProfileService,
        CarService,
        SidebarService,
        ModalService,
        ApiService,
        TimelineService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }