import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { CarService, SidebarService, ModalService, TimelineService } from '../../../services/index';

@Component({
    //moduleId: module.id,
    selector: 'garage',
    styleUrls: ['./garageMenu.component.scss'],
    templateUrl: './garageMenu.component.html'
})

export class GarageMenuComponent implements OnInit{
    private selected: string;
    private cars: any[] = [];

    constructor(
        private router: Router,
        private carService: CarService,
        private sidebarService: SidebarService,
        private modalService: ModalService,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.getCars();

        this.sidebarService.getCarMenu$()
            .subscribe(
            () => {
                this.selected = null;

            });

        this.sidebarService.getCarMenu$().subscribe((menuName: string) => {
            this.updateSelectedCarMenu(menuName);
        });
    }

    // sub menu car details
    onMenuClick(modalName: string) {
        //this.modalService.setModalName(modalName);
    }

    // Navigate to the selected Car on menu Click
    onCarSelect(car: any) {
        this.sidebarService.setCarMenu$(null); 

        this.selected = car.name;

        // use this instead of [routerLink] as we want to do things before the route is initialized
        this.router.navigate(['/cars', car.route]);
    }

    onGarageSelect() {
        this.sidebarService.setCarMenu$(null);

        this.selected = 'garage';
    }

    getCars() {
        this.carService.getCars().subscribe(
            cars => {
                this.cars = cars;
            },
            error => this.handleError(error)
        );
    }

    // Update the selected Car in the menu when the URL change
    updateSelectedCarMenu(menuName: string) {
        this.selected = menuName;
    }

    handleError(error: Error) {
        console.log(error);
    }
}