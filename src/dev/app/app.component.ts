﻿import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeaderComponent} from './views/header/header.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {AllCarsComponent} from './views/content/allCars/allCars.component';
import {CarComponent} from './views/content/car/car.component';

// TODO add jQuery to typings
// ingore ts lint erros
declare const $: any;

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent]
})

@RouteConfig([
        { path: '/cars', name: 'Cars', component: AllCarsComponent },
        { path: '/car', name: 'Car', component: CarComponent },
        { path: '/documents', name: 'Documents', component: AllCarsComponent },
        { path: '/sharedfolder', name: 'SharedFolder', component: AllCarsComponent },
        { path: '/publiclibrary', name: 'PublicLibrary', component: AllCarsComponent }
])

export class AppComponent {
    ngAfterViewInit() {
        $.material.init();
    }
}