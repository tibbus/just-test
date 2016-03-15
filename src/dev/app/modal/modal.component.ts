import {Component} from 'angular2/core';
import {ModalService} from './modal.service';

// TODO add jQuery to typings
// ingore ts lint erros
declare const $: any;

@Component({
    selector: 'video-modal',
    templateUrl: 'src/dev/app/modal/modal.component.html'
})

export abstract class ModalComponent {
    title: string = 'Default Title !';

    constructor(private _modalService: ModalService) { }  

    ngOnInit() {
        $('#myModal').on('hidden.bs.modal', (e) => {
            this.onModalClose();  
        })
    }

    onModalClose() {
        this._modalService.setModalName('');
    }
}