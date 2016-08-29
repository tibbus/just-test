import { Component, OnInit, ViewChild, ViewContainerRef, ComponentResolver, Input } from '@angular/core';

import { CarService } from '../../../services/index';
import { AlertComponent } from '../../../components/alert/alert.component';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
    selector: 'test2',
    template: `test 2222`
})

export class Test2 { }

@Component({
    selector: 'testing',
    template: `test55 <template #testUp> </template>`
})

export class Test {
    @Input() dirP;
    @ViewChild('testUp', { read: ViewContainerRef }) testUp;

    constructor(private componentResolver: ComponentResolver) { }

    ngAfterViewInit() {
        this.componentResolver.resolveComponent(this.dirP).then((factory) => {
            this.testUp.createComponent(factory);
        });
    }
}

@Component({
    selector: 'all-cars',
    styleUrls: ['src/dist/app/views/+content/garage/garage.component.css'],
    templateUrl: 'src/dev/app/views/+content/garage/garage.component.html',
    directives: [AlertComponent, LoadingComponent, Test]
})

export class GarageComponent implements OnInit {
    pass: any;
    cars: any;
    regNumber: string;
    loading: boolean = false;
    requestState: boolean = false;
    alertMessage: string;

    constructor(private carService: CarService, private componentResolver: ComponentResolver) { }

    ngOnInit() {
        this.pass = Test2;

        this.getCars();
    }

    getCars() {
        this.carService.getCars().delay(500).subscribe(
            cars => {
                this.cars = cars;
            },
            error => this.handleError(error)
        );
    }

    changeRegNumber(value: string) {
        this.regNumber = value;
    }

    clickAddCar() {
        this.loading = true;

        this.carService.addCar(this.regNumber)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertMessage = `The car with the registration number: ${this.regNumber} was succesufully added to your garage !`;

                // update the car list (make a new server request in the service)
                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    clickRemove(carId) {
        this.loading = true;

        this.carService.removeCar(carId)
            .subscribe(
            () => {
                this.loading = false;
                this.requestState = true;
                this.alertMessage = `The car was successfully removed from your garage !`;

                // update the car list (make a new server request in the service)
                this.carService.getCars(true);
            },
            error => this.handleError(error));
    }

    // @Output : reset the message on alert Close
    resetAlertMessage() {
        this.alertMessage = null;
    }

    handleError(error: Error) {
        this.requestState = false;

        this.loading = false;

        this.alertMessage = 'Sorry, the request failed.';

        console.log(error);
    }
}