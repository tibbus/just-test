import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomePage} from './pages/home/homePage.component';
import {OnePage} from './pages/one/onePage.component';
import {TwoPage} from './pages/two/twoPage.component';
import {ErrorPage} from './pages/error/errorPage.component';

@Component({
    selector: 'my-app',
    templateUrl: 'src/dev/app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomePage },
    { path: '/page1', name: 'Page1', component: OnePage },
    { path: '/page2', name: 'Page2', component: TwoPage },
    { path: '/*allRoutes', name: 'Error', component: ErrorPage }
])

export class AppComponent {
    public sayHello: string = "Hello there !";
}