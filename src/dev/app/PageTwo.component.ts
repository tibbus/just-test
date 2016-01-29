import {Component} from 'angular2/core';

@Component({
    selector: 'page-two-component',
    template: `<h2>Page {{ pageNumber }} Content !</h2>    
             `
})

export class PageTwo {
    public pageNumber: string = "Two";
}