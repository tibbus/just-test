import {Component, Input} from 'angular2/core';

@Component({
    selector: 'error',
    templateUrl: 'src/dev/app/common/error/error.component.html',
    styleUrls: ['src/dist/app/common/error/error.component.css']
})

export class ErrorComponent {
    @Input() errorMessage: string;
}