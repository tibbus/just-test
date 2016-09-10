import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService, TimelineService } from '../../services/index';

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/views/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/sidebar.component.html'
})

export class SidebarComponent {
    private selected: string;
    private docs: any[] = [
        { name: 'My Documents', route: 'Documents' },
        { name: 'Shared Folder', route: 'Folder' },
        { name: 'Public Library', route: 'Library' }
    ];
    modalName: string;

    constructor(private _router: Router, private _sidebarService: SidebarService, private timelineService: TimelineService) {
    }

    ngOnInit() {
        this._sidebarService.unSelect$
            .subscribe(
                () => {
                    this.selected = null;
            });

        if (window.location.pathname === '/feed') {
            this.selected = 'feed';
        }
    }

    onSelect(item: string) {
        this._sidebarService.unSelectMenus();    

        this.selected = item;
    }
}