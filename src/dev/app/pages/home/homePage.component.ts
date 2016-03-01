import {Component} from 'angular2/core';

@Component({
    selector: 'home-component',
    templateUrl: 'src/dev/app/pages/home/home.component.html',
    styleUrls: ['src/dev/app/pages/home/home.component.css']
})

export class HomePage {
    private homeVar: string = 'home var';
}