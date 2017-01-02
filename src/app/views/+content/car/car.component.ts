import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CarDetailsModalContentComponent } from './carDetailsModal/carDetailsModalContent.component';
import { TaxDetailsModalContentComponent } from './taxDetailsModal/taxDetailsModalContent.component';
import { MotDetailsModalContentComponent } from './motDetailsModal/motDetailsModalContent.component';
import { CarService, ModalService, TimelineService, PostService, FollowService, SidebarService } from '../../../services/index';

import { Car, CarInfo, Mot, Tax } from '../../../services/car/car.model';

declare const jQuery: any;

@Component({
    //moduleId: module.id,
    selector: 'car-content',
    styleUrls: ['./car.component.scss'],
    templateUrl: './car.component.html',
    providers: [PostService]
})

export class CarComponent implements OnInit, OnDestroy {
    modalName: string;
    private modalSubscription: Subscription;
    carLoaded: boolean;
    CarDetailsComponent: any = CarDetailsModalContentComponent;
    TaxDetailsComponent: any = TaxDetailsModalContentComponent;
    MotDetailsComponent: any = MotDetailsModalContentComponent;

    constructor(
        private carService: CarService,
        private router: Router,
        private modalService: ModalService,
        private ref: ChangeDetectorRef,
        private timelineService: TimelineService,
        private route: ActivatedRoute,
        private followService: FollowService,
        private sidebarService: SidebarService
    ) {
        // on modal open/close :
        this.modalSubscription = modalService.getModalName$().subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                // open the modal
                jQuery('#myModal').modal('show');
            });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.carLoaded = false;
            // used to re-render the component and all the sub-components
            this.ref.detectChanges();

            this.getCars(params['id']);
        });
    }

    getCars(carRoute: string) {
        this.carService.getCars().delay(100).subscribe(
            cars => {
                const parsedRoute = carRoute.split('-');
                const carId = parsedRoute[parsedRoute.length - 1];

                this.carService.setCarByRoute(carRoute, carId);
                this.timelineService.actor = {
                    actorType: 'car',
                    actorId: carId
                };
                this.sidebarService.setCarMenu$(this.carService.selectedCar ? this.carService.selectedCar.name : null);
                this.followService.setFollowState(true);
                this.followService.handleFollow()

                this.carLoaded = true;
            });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }
}