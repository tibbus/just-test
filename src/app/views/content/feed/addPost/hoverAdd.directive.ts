import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[hoverAdd]' })
export class HoverAddDirective {
    constructor(private el: ElementRef) {

        console.log(el);
    }

    private elToHide;
    private timer;

    ngOnInit() {
        const children = Array.from(this.el.nativeElement.children);

        this.elToHide = children.filter((domEl: any) => {
            const elClassList: any = Array.from(domEl.classList);

            return !elClassList.includes('add__plus');
        });

        this.hideElements();
    }

    private hideElements() {
        this.elToHide.forEach((domEl: any) => {
            domEl.style.opacity = '0';
        })
    }

    private showElements() {
        this.elToHide.forEach((domEl: any) => {
            domEl.style.opacity = '1';
        })
    }

    @HostListener('mouseenter') onMouseEnter() {
        clearTimeout(this.timer);
        this.showElements();
    }

    @HostListener('mouseleave') onMouseLeave() {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.hideElements.bind(this), 500);
    }
}