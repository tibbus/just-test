import {Component} from 'angular2/core';

@Component({
    selector: 'profile',
    styleUrls: ['src/dist/app/views/content/profile/profile.component.css'],
    templateUrl: 'src/dev/app/views/content/profile/profile.component.html'
})

export class ProfileComponent {
    public sayHello: string = "Hello there !";
}