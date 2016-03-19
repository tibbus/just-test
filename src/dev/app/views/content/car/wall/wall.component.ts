import {Component} from 'angular2/core';

@Component({
    selector: 'wall',
    styleUrls: ['src/dist/app/views/content/car/wall/wall.component.css'],
    templateUrl: 'src/dev/app/views/content/car/wall/wall.component.html'
})

export class WallComponent {
    public sayHello: string = "Hello there !";
}