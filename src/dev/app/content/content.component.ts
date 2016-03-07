import {Component} from 'angular2/core';

@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/content/content.component.css'],
    templateUrl: 'src/dev/app/content/content.component.html'
})

export class ContentComponent {
    public sayHello: string = "Hello there !";
}