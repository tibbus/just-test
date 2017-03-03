import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CarService, ModalService, TimelineService, PostService, FollowService } from '../../../services/index';
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

    constructor(
        private carService: CarService,
        private router: Router,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private route: ActivatedRoute,
        private followService: FollowService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.carLoaded = false;
            // used to re-render the component and all the sub-components
            this.ref.detectChanges();

            this.getCars(params['id']);
        });
    }

    getCars(carRoute: string) {
        const parsedRoute = carRoute.split('-');
        const carId = parsedRoute[parsedRoute.length - 1];

        this.carService.setCarByRoute(carRoute, carId);
        this.timelineService.actor = {
            actorType: 'car',
            actorId: carId
        };
        this.followService.setFollowState(true);
        this.followService.handleFollow()

        this.carLoaded = true;
    }

    ngOnDestroy() {
        // Hide follow button
        this.followService.setFollowState(false);
    }
}