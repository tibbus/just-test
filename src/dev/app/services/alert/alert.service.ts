import {Injectable}     from '@angular/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private message = new Subject<string>();

    // Observable string streams
    message$ = this.message.asObservable();

    // Service message commands
    setMessage(value: string) {
        this.message.next(value);
    }
}