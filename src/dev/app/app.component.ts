﻿import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { GarageComponent } from './views/content/garage/garage.component';
import { CarComponent } from './views/content/car/car.component';
import { ProfileComponent } from './views/content/profile/profile.component';
import { NotFoundComponent } from './views/content/notFound/notFound.component';
import * as _ from 'lodash';

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent]
})

@RouteConfig([
        { path: '/', name: 'HomePage', redirectTo: ['Garage']},
        { path: '/feed', name: 'Feed', component: NotFoundComponent },
        { path: '/garage', name: 'Garage', component: GarageComponent },
        { path: '/car/:id', name: 'Car', component: CarComponent },
        { path: '/documents', name: 'Documents', component: NotFoundComponent },
        { path: '/folder', name: 'Folder', component: NotFoundComponent },
        { path: '/library', name: 'Library', component: NotFoundComponent },
        { path: '/profile', name: 'Profile', component: ProfileComponent },    
        { path: '/*ErrorRoutes', name: 'NotFound', component: NotFoundComponent }
])

export class AppComponent {
    ngOnInit() {
        jQuery.material.init();
    }
}