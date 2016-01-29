import {Component} from 'angular2/core';

@Component({
    selector: 'page-two-component',
    template: `<h2>Page {{ pageNumber }} Content !</h2>    
             `
})

export class TwoPage {
    public pageNumber: string = "Two";
}