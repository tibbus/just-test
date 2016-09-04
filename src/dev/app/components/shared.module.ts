import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent }  from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertComponent, LoadingComponent, ModalComponent],
    exports: [AlertComponent, LoadingComponent, ModalComponent, 
        CommonModule, FormsModule]
})

export class SharedModule { }
