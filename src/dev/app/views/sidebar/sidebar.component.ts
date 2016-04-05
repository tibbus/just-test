import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, Location} from 'angular2/router';
import {CarService} from '../../services/car/car.service';

// TODO add lodash to typings
// ingore ts lint erros
declare const _: any;

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/views/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CarService]
})

export class SidebarComponent {
    private selected: string;
    //private cars: any[] = [
    //    { name: 'McLaren MP4-12C', route: 'mclaren' },
    //    { name: 'Aston Martin DB9', route: 'aston' },
    //    { name: 'Audi Q7', route: 'audi' }
    //];
    private cars: any[] = [];
    private docs: any[] = [
        { name: 'My Documents', route: 'Documents' },
        { name: 'Shared Folder', route: 'Folder' },
        { name: 'Public Library', route: 'Library' }
    ];

    constructor(private _router: Router, private _location: Location, private _carService: CarService) { }

    private ngOnInit() {
        const path = this._location.path();
        const currentRoute = this.getCurrentRoute(path);

        this.selected = this.getCarByRoute(currentRoute);

        this.getCars();
    }

    onSelect(item: string) {
        this.selected = item;
    }

    onCarSelect(item: any) {
        this.selected = item.name;

        this._router.navigate(['Car', { id: item.route }]);
    }

    getCarByRoute(route: string): string {
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

    getCurrentRoute(path: string): string {
        const formattedArray = path.split('/');

        return _.last(formattedArray);
    }

    getCars() {
        this._carService.getCars()
            .subscribe(
                cars => {
                    console.log(cars);
                    this.cars = cars;
                },
                error => this.handleError(error));
    }

    handleError(error: Error) {
        console.log(error);
    }
}