import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'my-app',
    templateUrl: 'src/dev/app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
    public sayHello: string = "Hello there !";
}