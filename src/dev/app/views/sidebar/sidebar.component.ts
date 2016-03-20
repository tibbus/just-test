import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router';

// TODO add jQuery to typings
// ingore ts lint erros
declare const _: any;

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/views/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class SidebarComponent {
    private selected: string;
    private cars: any[] = [
        { name: 'McLaren MP4-12C', route: 'mclaren' },
        { name: 'Aston Martin DB9', route: 'aston' },
        { name: 'Audi Q7', route: 'audi' }
    ];
    private docs: any[] = [
        { name: 'My Documents', route: 'Documents' },
        { name: 'Shared Folder', route: 'Folder' },
        { name: 'Public Library', route: 'Library' }
    ];

    constructor(private _router: Router, private _location: Location) { }

    private ngOnInit() {
        const path = this._location.path();
        const currentRoute = this.getCurrentRoute(path);

        this.selected = this.getCarByRoute(currentRoute);
    }

    private onSelect(item: string) {
        this.selected = item;
    }

    private onCarSelect(item: any) {
        this.selected = item.name;

        this._router.navigate(['Car', { id: item.route }]);
    }

    private getCarByRoute(route: string): string {
        let itemName: string;
        const allItems = this.cars.concat(this.docs);

        _.each(allItems, (car) => {
            if (route === car.route.toLowerCase()) {
                itemName = car.name
            }
        })

        if (route === 'cars') {
            return 'All Cars';
        } else {
            return itemName;
        }
    }

    private getCurrentRoute(path: string): string {
        const formattedArray = path.split('/');

        return _.last(formattedArray);
    }
}