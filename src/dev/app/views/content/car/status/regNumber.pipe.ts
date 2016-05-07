import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'regNumber'
})
export class RegNumberPipe implements PipeTransform {
    transform(value) {
        const last_3_chars = value.slice(-3);

        return value.replace(last_3_chars, ' ' + last_3_chars);
    }
}