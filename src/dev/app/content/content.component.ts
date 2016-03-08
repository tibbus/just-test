﻿import {Component} from 'angular2/core';
import {StatusComponent} from './status/status.component';
import {WallComponent} from './wall/wall.component';

@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/content/content.component.css'],
    templateUrl: 'src/dev/app/content/content.component.html',
    directives: [StatusComponent, WallComponent]
})

export class ContentComponent {
    public sayHello: string = "Hello there !";
}