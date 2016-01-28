import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `<h1>{{ sayHello }}</h1>`
})

export class AppComponent {

    public sayHello: string = "Hello there !";
}