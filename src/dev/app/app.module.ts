import { NgModule, provide }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions }    from '@angular/http';
import { CustomRequestOptions } from './services/http/baseRequest';

import { routing }   from './app.routes';
import { AppComponent } from './app.component';

import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { ProfileComponent, NotFoundComponent, FeedComponent } from './views/+content/index';

import {
    ApiService,
    CarService,
    ProfileService,
    SidebarService,
    ModalService,
    PostService,
    TimelineService
} from './services/index';

import { SharedModule } from './components/shared.module';

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
        NotFoundComponent
    ],
    providers: [
        ProfileService,
        CarService,
        SidebarService,
        ModalService,
        ApiService,
        TimelineService,
        provide(RequestOptions, { useClass: CustomRequestOptions })

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }