import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { connect } from 'getstream';

import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'car-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public showHeader: boolean = true;

    constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        const streamClient = connect('5b5hp2vh27ds', null, '15872');

        this.apiService.setStreamClient(streamClient);

        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd === false) {
                return;
            }

            if (event.url.includes('/callback') || event.url === '/') {
                this.showHeader = false
            } else {
                this.showHeader = true;
            }
        });
    }
}