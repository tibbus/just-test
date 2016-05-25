import {Injectable}     from '@angular/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class ModalService {
    constructor() { console.log('construction')}
    // Observable string sources
    private _modalName = new Subject<string>();
    private _clickSave = new Subject<string>();
    private _closeModal = new Subject<string>();
    private _loading = new Subject<string>();

    // Observable string streams
    modalName = this._modalName.asObservable();
    clickSave = this._clickSave.asObservable();
    closeModal = this._closeModal.asObservable();
    loading = this._closeModal.asObservable();

    setModalName(modalName: string) {
        this._modalName.next(modalName);
    }

    sendModalClose() {
        this._closeModal.next('close');
    }

    sendClickSave() {
        this._clickSave.next('nextClick');
    }

    setLoading() {
        this._loading.next('loading');
    }
}