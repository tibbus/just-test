import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeaderComponent} from './views/header/header.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {ContentComponent} from './views/content/content.component';

// TODO add jQuery to typings
// ingore ts lint erros
declare const $: any;

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent, ContentComponent]
})

export class AppComponent {
    ngAfterViewInit() {
        $.material.init();
    }
}