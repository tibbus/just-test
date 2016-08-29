import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { routing }   from './app.routes';
import { AppComponent } from './app.component';

import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import {
    GarageComponent,
    CarComponent,
    ProfileComponent,
    NotFoundComponent,
    FeedComponent
} from './views/+content/index';

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
        routing,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        GarageComponent,
        CarComponent,
        ProfileComponent,
        NotFoundComponent,
        //FeedComponent
    ],
    providers: [
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