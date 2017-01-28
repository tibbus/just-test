import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
// @TODO add types for this
const getStream = require('getstream');

declare const jQuery: any;

@Component({
    selector: 'car-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(private apiService: ApiService, private authService: AuthService) { }

    ngOnInit() {
        const streamClient = getStream.connect('8r2y2gbevg9j', null, '15872');

        this.apiService.setStreamClient(streamClient);
    }
}