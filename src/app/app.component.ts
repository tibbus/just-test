import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';

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
    constructor(private apiService: ApiService, private authService: AuthService) { }

    ngOnInit() {
        jQuery.material.init();

        const streamClient = stream.connect('8r2y2gbevg9j', null, '15872');
        this.apiService.setStreamClient(streamClient); 
    }
}