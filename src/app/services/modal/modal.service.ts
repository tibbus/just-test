import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
    private modalClose$ = new Subject<boolean>();
    private modalSave$ = new Subject<boolean>();
    private modalLoading$ = new Subject<boolean>();

    constructor() {}

    public getModalClose() {
        return this.modalClose$;
    }

    public setModalClose() {
        this.modalClose$.next(true);
    }

    public getModalSave() {
        return this.modalSave$;
    }

    public setModalSave() {
        this.modalSave$.next(true);
        return this.modalSave$;
    }

    public getModalLoading() {
        return this.modalLoading$;
    }

    public setModalLoading() {
        this.modalLoading$.next(true);
    }
}