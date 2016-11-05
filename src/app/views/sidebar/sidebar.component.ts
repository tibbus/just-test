import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService, TimelineService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    styleUrls: ['sidebar.component.css'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent {
    private selected: string;
    private docs: any[] = [
        { name: 'My Documents', route: 'Documents' },
        { name: 'Shared Folder', route: 'Folder' },
        { name: 'Public Library', route: 'Library' }
    ];
    modalName: string;

    constructor(private _router: Router, private sidebarService: SidebarService, private timelineService: TimelineService) {
    }

    ngOnInit() {
        this.sidebarService.getCarMenu$()
            .subscribe(
                () => {
                    this.selected = null;
            });

        if (window.location.pathname === '/feed') {
            this.selected = 'feed';
        }
    }

    onSelect(item: string) {
        this.sidebarService.setCarMenu$(null);    

        this.selected = item;
    }
}