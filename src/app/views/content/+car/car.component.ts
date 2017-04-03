import { Component } from '@angular/core';

import { PostService } from '../../../services/index';

@Component({
    selector: 'car-content',
    styleUrls: ['./car.component.scss'],
    templateUrl: './car.component.html',
    providers: [PostService]
})

export class CarComponent {

}