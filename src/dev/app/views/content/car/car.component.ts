import {Component} from 'angular2/core';
import {StatusComponent} from './status/status.component';
import {WallComponent} from './wall/wall.component';

@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/views/content/car/car.component.css'],
    templateUrl: 'src/dev/app/views/content/car/car.component.html',
    directives: [StatusComponent, WallComponent]
})

export class CarComponent {
    public sayHello: string = "Hello there !";
}