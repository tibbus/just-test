import { Component, OnInit } from '@angular/core';

import { CarService, ProfileService } from '../../../../services';

@Component({
    selector: 'car-owner',
    styleUrls: ['./carOwner.component.scss'],
    templateUrl: './carOwner.component.html'
})

export class CarOwnerComponent implements OnInit {
    public user;
    public car;

    constructor(private carService: CarService, private profileService: ProfileService) { }

    ngOnInit() {
        this.car = this.carService.getCar();
        console.log(this.car);

        this.profileService.getProfile().subscribe(user =>  this.user = user);
    }
}