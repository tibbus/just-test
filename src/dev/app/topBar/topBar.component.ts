import {Component} from 'angular2/core';

@Component({
    selector: 'top-bar',
    styleUrls: ['src/dist/app/topBar/topBar.component.css'],
    templateUrl: 'src/dev/app/topBar/topBar.component.html'
})

export class TopBarComponent {
    public sayHello: string = "Hello there !";
}