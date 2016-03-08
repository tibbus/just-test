import {Component} from 'angular2/core';

@Component({
    selector: 'wall',
    styleUrls: ['src/dist/app/content/wall/wall.component.css'],
    templateUrl: 'src/dev/app/content/wall/wall.component.html'
})

export class WallComponent {
    public sayHello: string = "Hello there !";
}