import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
    constructor() { }

    public modalName = new Subject<string>();
    public clickSave = new Subject<string>();
    public closeModal = new Subject<string>();
    public loading = new Subject<string>();

    setModalName(modalName: string) {
        this.modalName.next(modalName);
    }

    sendModalClose() {
        this.closeModal.next('close');
    }

    sendClickSave() {
        this.clickSave.next('nextClick');
    }

    setLoading() {
        this.loading.next('loading');
    }
}