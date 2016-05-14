import {Injectable}     from '@angular/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class ModalService {
    // Observable string sources
    private _modalName = new Subject<string>();

    // Observable string streams
    modalName = this._modalName.asObservable();

    // Service message commands
    setModalName(modalName: string) {
        this._modalName.next(modalName);
    }
}