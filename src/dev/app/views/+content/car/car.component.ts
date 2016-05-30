﻿import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Subscription } from 'rxjs/Subscription';

import { AddPostComponent } from './addPost/addPost.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CarService, StatusService, ModalService, TimelineService } from '../../../services/index';
import {
    CarDetailsModalComponent,
    TaxDetailsModalComponent,
    MotDetailsModalComponent
} from './index';


@Component({
    selector: 'content',
    styleUrls: ['src/dist/app/views/+content/car/car.component.css'],
    templateUrl: 'src/dev/app/views/+content/car/car.component.html',
    directives: [
        AddPostComponent,
        TimelineComponent,
        ROUTER_DIRECTIVES,
        CarDetailsModalComponent,
        TaxDetailsModalComponent,
        MotDetailsModalComponent
    ],
    providers: [StatusService, TimelineService]
})

export class CarComponent implements OnInit, OnDestroy {
    modalName: string;
    private modalSubscription: Subscription;

    constructor(
        private carService: CarService,
        private router: Router,
        private modalService: ModalService,
        private ref: ChangeDetectorRef
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

    carLoaded: boolean = false;

    ngOnInit() {
        this.carService.getCars().delay(150).subscribe(
            (cars) => {
                if (!this.carService.selectedCar) {
                    this.router.navigate(['NotFound']);

                    return;
                }
                
                this.carLoaded = true;
        });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }  
}