import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent }  from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { UploadFileDirective } from './uploadFile.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AlertComponent,
        LoadingComponent,
        ModalComponent,
        UploadFileDirective
    ],
    exports: [
        AlertComponent,
        LoadingComponent,
        ModalComponent, 
        CommonModule,
        FormsModule,
        UploadFileDirective
    ]
})

export class SharedModule { }
