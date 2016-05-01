import {Injectable}     from 'angular2/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class SidebarService {
    private _unSelect = new Subject<boolean>();

    unSelect$ = this._unSelect.asObservable();

    unSelectMenus() {
        this._unSelect.next(true);
    }
}