import {Component} from 'angular2/core';

@Component({
    selector: 'top-bar',
    styles: [`.search {width: 350px}`],
    templateUrl: 'src/dev/app/topBar/topBar.component.html'
})

export class TopBarComponent {
    public sayHello: string = "Hello there !";
}