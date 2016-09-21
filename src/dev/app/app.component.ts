﻿import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';

import * as _ from 'lodash';
// todo : move it to typings/typescript
declare const stream: any;

@Component({
    moduleId: module.id,
    selector: 'car-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent {
    constructor(private apiService: ApiService) { }

    ngOnInit() {
        jQuery.material.init();

        this.apiService.streamClient = stream.connect('8r2y2gbevg9j', null, '15872');
    }
}