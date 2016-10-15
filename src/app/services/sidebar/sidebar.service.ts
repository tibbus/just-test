import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
    private unSelect = new Subject<boolean>();
    public updateMenu$ = new Subject();

    unSelect$ = this.unSelect.asObservable();

    unSelectMenus() {
        this.unSelect.next(true);
    }

    updateSelectedCarMenu(menuName: string) {
        this.updateMenu$.next(menuName);
    }
}