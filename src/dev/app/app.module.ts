import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions }    from '@angular/http';
import { CustomRequestOptions } from './services/http/baseRequest';

import { routing }   from './app.routes';
import { AppComponent } from './app.component';

import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { ProfileComponent, NotFoundComponent, FeedComponent } from './views/+content/index';
import { GarageMenuComponent } from './views/sidebar/garageMenu/garageMenu.component';

import {
    ApiService,
    CarService,
    ProfileService,
    SidebarService,
    ModalService,
    PostService,
    TimelineService,
    FollowService
} from './services/index';

import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        routing,
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        ProfileComponent,
        NotFoundComponent,
        FeedComponent,
        GarageMenuComponent
    ],
    providers: [
        ProfileService,
        CarService,
        SidebarService,
        ModalService,
        ApiService,
        TimelineService,
        FollowService,
        { provide: RequestOptions, useClass: CustomRequestOptions }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }