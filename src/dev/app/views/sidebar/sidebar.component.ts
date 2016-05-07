import {Component, ChangeDetectorRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {GarageComponent} from './garage/garage.component';
import {SidebarService} from './sidebar.service';

@Component({
    selector: 'sidebar',
    styleUrls: ['src/dist/app/views/sidebar/sidebar.component.css'],
    templateUrl: 'src/dev/app/views/sidebar/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES, GarageComponent]
})

export class SidebarComponent {
    private selected: string;
    private docs: any[] = [
        { name: 'My Documents', route: 'Documents' },
        { name: 'Shared Folder', route: 'Folder' },
        { name: 'Public Library', route: 'Library' }
    ];
    modalName: string;

    constructor(private _router: Router, private _sidebarService: SidebarService) {
    }

    ngOnInit() {
        this._sidebarService.unSelect$
            .subscribe(
                () => {
                    this.selected = null;
            });
    }

    onSelect(item: string) {
        this._sidebarService.unSelectMenus();    

        this.selected = item;
    }
}