/* tslint:disable */

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {TopBarComponent} from './topBar/topBar.component';
import {LeftBarComponent} from './leftBar/leftBar.component';

// TODO add jQuery to typings
// ingore ts lint erros
declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, TopBarComponent, LeftBarComponent]
})

export class AppComponent {
    ngAfterViewInit() {
        $.material.init();
    }
}