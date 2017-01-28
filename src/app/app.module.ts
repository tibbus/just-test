import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './services/http/baseRequest';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { ProfileComponent, NotFoundComponent, FeedComponent } from './views/+content/index';
import { GarageComponent } from './views/+content/garage/garage.component';
import { AddCarModalComponent } from './views/+content/garage/addCarModal/addCarModal.component';
import { GarageMenuComponent } from './views/sidebar/garageMenu/garageMenu.component';
import { AuthComponent } from './views/auth/auth.component';
import { StreamService } from './services/stream/stream.service';

import {
    ApiService,
    CarService,
    ProfileService,
    SidebarService,
    ModalService,
    PostService,
    TimelineService,
    FollowService,
    CommentsService,
    AuthService,
    LikesService
} from './services/index';

import { SharedModule } from './shared/shared.module';
import useFactory from './factory';

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
        GarageMenuComponent,
        GarageComponent,
        AuthComponent,
        AddCarModalComponent
    ],
    entryComponents: [
        AddCarModalComponent
    ],
    providers: [
        ProfileService,
        CarService,
        SidebarService,
        ModalService,
        ApiService,
        TimelineService,
        FollowService,
        AuthService,
        StreamService,
        LikesService,
        { provide: RequestOptions, useClass: CustomRequestOptions },
        // provideInterceptorService([
        //     ServerURLInterceptor
        // ]),
        {
            provide: APP_INITIALIZER,
            useFactory: useFactory,
            deps: [AuthService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }