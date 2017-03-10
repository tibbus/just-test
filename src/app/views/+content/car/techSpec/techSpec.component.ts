import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CarService } from '../../../../services/car/car.service'

@Component({
    selector: 'tech-spec',
    styleUrls: ['./techSpec.component.scss'],
    templateUrl: './techSpec.component.html'
})

export class TechSpecComponent implements OnInit, OnDestroy{
    public car;
    private route$: Subscription;

    constructor(private carService: CarService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route$ = this.route.parent.params.subscribe(params => {
            const carRoute = params['id'];
            const parsedRoute = carRoute.split('-');
            const carId = parsedRoute[parsedRoute.length - 1];

            this.carService.getCarById(carId).subscribe(data => {
                this.car = data;
            })
        });
    }

    ngOnDestroy() {
        this.route$.unsubscribe();
    }
}