import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router';

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/views/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class SidebarComponent {
    constructor(private _router: Router, private _location: Location) {
        this.selected = 'McLaren MP4-12C';
    }

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

    ngOnInit() {
        console.log(this._location.path());
    }

    onSelect(item: string): void {
        this.selected = item;
    }

    onCarSelect(item: any): void {
        this.selected = item.name;

        this._router.navigate(['Car', { id: item.route }]);
    }
}