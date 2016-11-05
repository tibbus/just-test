import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
    private menu$ = new Subject();

    public getCarMenu$() {
        return this.menu$;
    }

    public setCarMenu$(menuName: string) {
        this.menu$.next(menuName);
    }
}