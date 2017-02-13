import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
    selector: 'car-navigation',
    styleUrls: ['./carNavigation.component.scss'],
    templateUrl: './carNavigation.component.html'
})

export class CarNavigationComponent {
    public active: string;

    constructor(private router: Router) {
        this.active = this.getRouteFromUrl(this.router.url);

        console.log(this.active);
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.active = this.getRouteFromUrl(event.url);

                console.log(this.active);
            }
        })
    }

    private getRouteFromUrl(url) {
        const routesArray = url.split('/');

        return routesArray[routesArray.length - 1];
    }
}