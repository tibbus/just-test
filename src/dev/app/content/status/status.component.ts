import {Component} from 'angular2/core';

@Component({
    selector: 'status',
    styleUrls: ['src/dist/app/content/status/status.component.css'],
    templateUrl: 'src/dev/app/content/status/status.component.html'
})

export class StatusComponent {
    public sayHello: string = "Hello there !";
}