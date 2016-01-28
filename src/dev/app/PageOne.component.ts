import {Component} from 'angular2/core';

@Component({
    template: `<h2>Page {{ pageNumber }} Content !</h2>    
             `
})

export class PageOne {
    public pageNumber: string = "One";
}