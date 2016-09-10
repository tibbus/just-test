import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AddPostComponent } from './addPost/addPost.component';
import { CarDetailsModalContentComponent } from './carDetailsModal/carDetailsModalContent.component';
import { TaxDetailsModalContentComponent } from './taxDetailsModal/taxDetailsModalContent.component';
import { MotDetailsModalContentComponent } from './motDetailsModal/motDetailsModalContent.component';
import { CarService, ModalService, TimelineService, PostService } from '../../../../services/index';

import { Car, CarInfo, Mot, Tax } from '../../../../services/car/car';

@Component({
    selector: 'car-content',
    styleUrls: ['src/dist/app/views/+content/cars/car/car.component.css'],
    templateUrl: 'src/dev/app/views/+content/cars/car/car.component.html',
    directives: [
        AddPostComponent
    ],
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
        private timelineService: TimelineService
    ) {
        // on modal open/close :
        this.modalSubscription = modalService.modalName.subscribe(
            modalName => {
                this.modalName = modalName;

                this.ref.detectChanges();

                // open the modal
                jQuery('#myModal').modal('show');
            });
    }

    ngOnInit() {
        this.getCars();
    }

    getCars() {
        this.carService.getCars().delay(500).subscribe(
            (cars: any) => {
                if (!this.carService.selectedCar) {
                    this.router.navigate(['NotFound']);

                    return;
                }

                this.carLoaded = true;   

                this.timelineService.actor = {
                    actorType: 'car',
                    actorId: this.carService.selectedCar.id
                }; 
            });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }  
}