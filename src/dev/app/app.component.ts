import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';

import * as _ from 'lodash';

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent]
})

//@RouteConfig([
//        { path: '/', name: 'HomePage', redirectTo: ['Garage']},
//        { path: '/feed', name: 'Feed', component: FeedComponent },
//        { path: '/garage', name: 'Garage', component: GarageComponent },
//        { path: '/car/:id', name: 'Car', component: CarComponent },
//        { path: '/documents', name: 'Documents', component: NotFoundComponent },
//        { path: '/folder', name: 'Folder', component: NotFoundComponent },
//        { path: '/library', name: 'Library', component: NotFoundComponent },
//        { path: '/profile', name: 'Profile', component: ProfileComponent },    
//        { path: '/*ErrorRoutes', name: 'NotFound', component: NotFoundComponent }
//])

export class AppComponent {
    ngOnInit() {
       // window.location.href = 'http://google.com';

        jQuery.material.init();
    }
}