import {Component, Input} from 'angular2/core';

@Component({
    selector: 'alert',
    templateUrl: 'src/dev/app/common/alert/alert.component.html',
    styleUrls: ['src/dist/app/common/alert/alert.component.css']
})

export class AlertComponent {
    @Input() message: string;
    @Input() isError: boolean;
    @Input() isSuccess: boolean;

    public typeMessage: string;

    ngOnChanges() {
        if (this.isError) {
            this.typeMessage = 'Something gone wrong';
        } else {
            this.typeMessage = 'Success';
        }
    }
}