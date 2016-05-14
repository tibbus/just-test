import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'src/dev/app/common/alert/alert.component.html',
    styleUrls: ['src/dist/app/common/alert/alert.component.css']
})

export class AlertComponent implements OnInit  {
    @Input() message: string;
    @Input() state: boolean;

    typeMessage: string;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.message$.subscribe(
            (message: string) => {
                this.message = message;
            });
    }

    ngOnChanges() {
        if (this.state) {
            this.typeMessage = 'Success';
        } else {
            this.typeMessage = 'Something gone wrong';
        }
    }

    // Close the alert:
    onClickClose() {
        this.alertService.setMessage(null);
    }
}