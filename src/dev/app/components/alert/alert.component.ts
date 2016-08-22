import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'alert',
    templateUrl: 'src/dev/app/components/alert/alert.component.html',
    styleUrls: ['src/dist/app/components/alert/alert.component.css']
})

export class AlertComponent {
    @Input() message: string;
    @Input() state: boolean;
    @Output() resetAlertMessage = new EventEmitter();

    typeMessage: string;

    ngOnChanges() {
        if (this.state) {
            this.typeMessage = 'Success';
        } else {
            this.typeMessage = 'Something gone wrong';
        }
    }

    // Close the alert:
    onClickClose() {
        this.resetAlertMessage.emit(null);
    }
}