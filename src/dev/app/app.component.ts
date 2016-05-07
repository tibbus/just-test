import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HeaderComponent} from './views/header/header.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {AllCarsComponent} from './views/content/allCars/allCars.component';
import {CarComponent} from './views/content/car/car.component';
import {ProfileComponent} from './views/content/profile/profile.component';
import {NotFoundComponent} from './views/content/notFound/notFound.component';

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent]
})

@RouteConfig([
        { path: '/', name: 'HomePage', redirectTo: ['Cars']},
        { path: '/cars', name: 'Cars', component: AllCarsComponent },
        { path: '/car/:id', name: 'Car', component: CarComponent },
        { path: '/documents', name: 'Documents', component: AllCarsComponent },
        { path: '/folder', name: 'Folder', component: AllCarsComponent },
        { path: '/library', name: 'Library', component: AllCarsComponent },
        { path: '/profile', name: 'Profile', component: ProfileComponent },    
        { path: '/*ErrorRoutes', name: 'NotFound', component: NotFoundComponent }
])

export class AppComponent {
    ngOnInit() {
        jQuery.material.init();
    }
}