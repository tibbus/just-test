import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
    private unSelect = new Subject<boolean>();

    unSelect$ = this.unSelect.asObservable();

    unSelectMenus() {
        this.unSelect.next(true);
    }
}