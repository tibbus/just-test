import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
declare const jQuery: any;

@Directive({ selector: '[uploadFile]' })

export class UploadFileDirective {
    @Output() onFileSelect = new EventEmitter();

    private $host: any;
    private $realUploader: any;

    constructor(el: ElementRef) {
        this.$realUploader = jQuery('<input type="file" name="pics">').css('display', 'none');

        this.$host = jQuery(el.nativeElement).append(this.$realUploader);

        this.$host.click((e: Event) => {
            // If the button is disabled, ignore the click
            if (this.$host.hasClass('disabled')) {
                return false;
            }

            e.stopImmediatePropagation();

            this.$realUploader.click();
        })

        this.$realUploader
            .click((e: Event) => {
                e.stopPropagation();
            })
            .change((e: any) => {
                e.stopPropagation();

                this.onFileSelect.emit(e.target.files[0]);
            });
    }
}