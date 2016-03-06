import {Component} from 'angular2/core';

@Component({
    selector: 'left-bar',
    styleUrls: ['src/dist/app/leftBar/leftBar.component.css'],
    templateUrl: 'src/dev/app/leftBar/leftBar.component.html'
})

export class LeftBarComponent {
    private sayHello: string = "Hello there !";
    private cars: string[] = ['All Cars', 'McLaren MP4-12C', 'Aston Martin DB9', 'Audi Q7'];
    private docs: string[] = ['My Documents', 'Shared Folder', 'Public Library'];
    private selected: string = this.cars[0];

    onSelect(item: string): void {
        this.selected = item;
    }
}