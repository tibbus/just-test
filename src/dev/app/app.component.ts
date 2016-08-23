import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';

import {
    ApiService,
    CarService,
    ProfileService,
    SidebarService,
    ModalService,
    PostService,
    TimelineService,
    SearchService
} from './services/index';

import * as _ from 'lodash';
// todo : move it to typings/typescript
declare const stream: any;

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent],
    providers: [
        ProfileService,
        CarService,
        SidebarService,
        ModalService,
        ApiService,
        TimelineService,
        SearchService 
    ]
})

export class AppComponent {
    constructor(private searchService: SearchService) { }

    ngOnInit() {
        console.log(stream);
        let client;

        client = stream.connect('sjc7un6vn6zp');
        console.log(client);
        
        jQuery.material.init();

        this.searchService.search().subscribe(item => {
            console.log(item);
        })
    }
}