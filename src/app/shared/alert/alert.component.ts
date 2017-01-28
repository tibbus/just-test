import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent {
    @Output() messageChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() set message(newMessage: string) {
        this.currentMessage = newMessage;
        this.messageChange.emit(newMessage);
    }
    @Input() state: boolean;

    private currentMessage: string;
    private typeMessage: string;

    get message(): string {
        return this.currentMessage;
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
        this.message = null;
    }
}