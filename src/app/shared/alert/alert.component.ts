import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
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