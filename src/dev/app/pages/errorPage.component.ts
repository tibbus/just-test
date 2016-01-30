import {Component} from 'angular2/core';
import {Location} from 'angular2/router';

@Component({
    selector: 'page-two-component',
    template: `<h2>The Page <span style="color:red">{{ pageName }}</span> does not exists !</h2>    
             `
})

export class ErrorPage {
    public pageName: String;

    constructor(location: Location) {
        this.pageName = location.path().substring(1);
    }
}