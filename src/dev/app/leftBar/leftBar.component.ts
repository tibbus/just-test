import {Component} from 'angular2/core';

@Component({
    selector: 'left-bar',
    styles: [`.left-buttons {width: 100%}`],
    templateUrl: 'src/dev/app/leftBar/leftBar.component.html'
})

export class LeftBarComponent {
    public sayHello: string = "Hello there !";
}