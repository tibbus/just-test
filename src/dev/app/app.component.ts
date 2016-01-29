import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomePage} from './pages/homePage.component';
import {OnePage} from './pages/onePage.component';
import {TwoPage} from './pages/twoPage.component';
import {ErrorPage} from './pages/errorPage.component';

@Component({
    selector: 'my-app',
    template: `<h1>{{ sayHello }}</h1>
               <a [routerLink]="['Home']">Home</a>  
               <a [routerLink]="['Page1']">Page1</a>
               <a [routerLink]="['Page2']">Page2</a>
               <router-outlet></router-outlet>
              `,
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