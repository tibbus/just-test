import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/views/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class SidebarComponent {
    private sayHello: string = "Hello there !";
    //private cars: string[] = ['All Cars', 'McLaren MP4-12C', 'Aston Martin DB9', 'Audi Q7'];
    private cars: any[] = [
        { name: 'McLaren MP4-12C', route: 'mclaren' },
        { name: 'Aston Martin DB9', route: 'aston' },
        { name: 'Audi Q7', route: 'audi' }
    ];
    //private docs: string[] = ['My Documents', 'Shared Folder', 'Public Library'];
    private docs: any[] = [
        { name: 'My Documents', route: 'Documents' },
        { name: 'Shared Folder', route: 'SharedFolder' },
        { name: 'Public Library', route: 'PublicLibrary' }
    ];
    private selected: string = this.cars[0];

    onSelect(item: string): void {
        this.selected = item;
    }
}