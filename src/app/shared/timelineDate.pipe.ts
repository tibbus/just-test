import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timelineDate'
})
export class TimelineDatePipe implements PipeTransform {
    transform(value) {
        return value ? moment(value).fromNow() : null;
    }
}