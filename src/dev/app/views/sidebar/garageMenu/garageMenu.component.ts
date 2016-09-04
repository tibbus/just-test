import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import * as _ from 'lodash';

import { CarService, SidebarService, ModalService } from '../../../services/index';

@Component({
    selector: 'garage',
    styleUrls: ['src/dist/app/views/sidebar/garageMenu/garageMenu.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/garageMenu/garageMenu.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class GarageMenuComponent implements OnInit{
    private selected: string;
    private cars: any[] = [];

    constructor(
        private _router: Router,
        private _carService: CarService,
        private _sidebarService: SidebarService,
        private _modalService: ModalService
    ) { }

    ngOnInit() {
        this.getCars();

        if (window.location.pathname === '/cars/garage') {
            this.selected = 'garage';
        }

        this._sidebarService.unSelect$
            .subscribe(
            () => {
                this.selected = null;

            });
    }

    // sub menu car details
    onMenuClick(modalName: string) {
        this._modalService.setModalName(modalName);
    }

    // Navigate to the selected Car on menu Click
    onCarSelect(car: any) {
        this._sidebarService.unSelectMenus(); 

        this.selected = car.name;

        this._carService.selectedCarId = car.id;

        // use this instead of [routerLink] as we want to do things before the route is initialized
        this._router.navigate(['/cars', car.route]);
    }

    onGarageSelect() {
        this._sidebarService.unSelectMenus();

        this.selected = 'garage';
    }

    getCarByRoute(route: string): string {
        let itemName: string;

        _.each(this.cars, (car) => {
            if (route === car.route.toLowerCase()) {
                itemName = car.name

                // TODO : move this to correct place
                this._carService.selectedCarId = car.id;
            }
        })

        return itemName;
    }

    getCurrentRoute(path: string): string {
        const formattedArray = path.split('/');

        return _.last(formattedArray);
    }

    getCars() {
        this._carService.getCars().subscribe(
            cars => {
                this.cars = cars;

                // Update the selected Car in the menu when the URL change
                if (window.location.pathname !== '/cars/garage') {
                    this.updateSelectedCarMenu();
                }
            },
            error => this.handleError(error)
        );
    }

    // Update the selected Car in the menu when the URL change
    updateSelectedCarMenu() {
        const path = window.location.pathname;
        const currentRoute = this.getCurrentRoute(path);

        this.selected = this.getCarByRoute(currentRoute);
    }

    handleError(error: Error) {
        console.log(error);
    }
}