import { Component } from '@angular/core';

import * as _ from 'lodash';
// todo : move it to typings/typescript
declare const stream: any;

@Component({
    selector: 'car-app',
    templateUrl: 'src/dev/app/app.component.html',
    styleUrls: ['src/dist/app/app.component.css']
})

export class AppComponent {
    ngOnInit() {
        console.log(stream);
        let client;

        //client = stream.connect('sjc7un6vn6zp');
        //console.log(client);
        
        jQuery.material.init();
    }
}