import {Component} from 'angular2/core';

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/sidebar/sidebar.component.html'
})

export class SidebarComponent {
    private sayHello: string = "Hello there !";
    private cars: string[] = ['All Cars', 'McLaren MP4-12C', 'Aston Martin DB9', 'Audi Q7'];
    private docs: string[] = ['My Documents', 'Shared Folder', 'Public Library'];
    private selected: string = this.cars[0];

    onSelect(item: string): void {
        this.selected = item;
    }
}