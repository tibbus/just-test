import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
    private modalName$ = new Subject<string>();
    private modalClose$ = new Subject<boolean>();
    private modalSave$ = new Subject<boolean>();
    private modalLoading$ = new Subject<boolean>();

    constructor() {}

    public getModalName$() {
        return this.modalName$;
    }

    public setModalName$(modalName: string) {
        this.modalName$.next(modalName);
    }

    public getModalClose$() {
        return this.modalClose$;
    }

    public setModalClose$() {
        this.modalClose$.next(true);
    }

    public getModalSave$() {
        return this.modalSave$;
    }

    public setModalSave$() {
        this.modalSave$.next(true);
    }

    public getModalLoading$() {
        return this.modalLoading$;
    }

    public setModalLoading$() {
        this.modalLoading$.next(true);
    }
}