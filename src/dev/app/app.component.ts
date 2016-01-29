import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Home} from './home.component';
import {PageOne} from './pageOne.component';
import {PageTwo} from './pageTwo.component';

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
        { path: '/', name: 'Home', component: Home },
        { path: '/page1', name: 'Page1', component: PageOne },
        { path: '/page2', name: 'Page2', component: PageTwo }
])

export class AppComponent {
    public sayHello: string = "Hello there !";
}