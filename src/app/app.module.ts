import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './services/http/baseRequest';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { ProfileComponent, NotFoundComponent } from './views/content/index';
import { GarageComponent } from './views/content/garage/garage.component';
import { AddCarModalComponent } from './views/content/garage/addCarModal/addCarModal.component';
import { AuthComponent } from './views/auth/auth.component';
import { StreamService } from './services/stream/stream.service';

import {
    ApiService,
    CarService,
    ProfileService,
    ModalService,
    PostService,
    TimelineService,
    FollowService,
    AuthService
} from './services/index';

import { SharedModule } from './shared/shared.module';
import { FeedModule } from './views/content/feed/feed.module';
import useFactory from './factory';

@NgModule({
    imports: [
        SharedModule,
        routing,
        BrowserModule,
        HttpModule,
        FeedModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        ProfileComponent,
        NotFoundComponent,
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
        ModalService,
        ApiService,
        TimelineService,
        FollowService,
        AuthService,
        StreamService,
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