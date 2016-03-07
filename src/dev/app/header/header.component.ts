import {Component} from 'angular2/core';

@Component({
    selector: 'header',
    styleUrls: ['src/dist/app/header/header.component.css'],
    templateUrl: 'src/dev/app/header/header.component.html'
})

export class HeaderComponent {
    public sayHello: string = "Hello there !";
}