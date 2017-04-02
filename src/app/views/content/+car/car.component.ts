import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CarService, ModalService, TimelineService, PostService, AuthService } from '../../../services/index';
import { Car, CarInfo, Mot, Tax } from '../../../services/car/car.model';
declare const jQuery: any;

@Component({
    selector: 'car-content',
    styleUrls: ['./car.component.scss'],
    templateUrl: './car.component.html',
    providers: [PostService]
})

export class CarComponent implements OnInit, OnDestroy {
    public carLoaded: boolean;
    private route$: Subscription;

    constructor(
        private carService: CarService,
        private router: Router,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route$ = this.route.params.subscribe(params => {
            this.carLoaded = false;

            // if the user is not logged in then request the car as `getCars` will not trigger
            if (!this.authService.getUser()) {
                this.getCar(params['id']);

                return;
            }

            this.carService.getCars().subscribe(cars => this.getCar(params['id']));
        });
    }

    ngOnDestroy() {
        this.route$.unsubscribe();
    }

    private getCar(carRoute: string) {
        const parsedRoute = carRoute.split('-');
        const carId = parsedRoute[parsedRoute.length - 1];

        this.carService.setCarByRoute(carRoute, carId);

        this.carLoaded = true;
    }
}