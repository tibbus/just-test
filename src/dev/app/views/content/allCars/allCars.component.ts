import {Component} from '@angular/core';

@Component({
    selector: 'all-cars',
    styleUrls: ['src/dist/app/views/content/allCars/allCars.component.css'],
    templateUrl: 'src/dev/app/views/content/allCars/allCars.component.html'
})

export class AllCarsComponent {
    public sayHello: string = "Hello there !";
}