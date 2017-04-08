import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './services/http/baseRequest';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { ProfileComponent, NotFoundComponent, GarageComponent } from './views/content/';
import { AddCarModalComponent } from './views/content/garage/addCarModal/addCarModal.component';
import { AuthCallbackComponent } from './views/authCallback/authCallback.component';
import { LoginComponent } from './views/login/login.component';

import {
    ApiService,
    CarService,
    ProfileService,
    ModalService,
    PostService,
    TimelineService,
    FollowService,
    AuthService,
    StreamService
} from './services/';
import AuthInitializer from './services/auth/authInitializer';

import { SharedModule } from './shared/shared.module';
import { FeedModule } from './views/content/feed/feed.module';

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
        AuthCallbackComponent,
        LoginComponent,
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
        PostService,
        { provide: RequestOptions, useClass: CustomRequestOptions },
        // provideInterceptorService([
        //     ServerURLInterceptor
        // ]),
        {
            provide: APP_INITIALIZER,
            useFactory: AuthInitializer,
            deps: [AuthService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }