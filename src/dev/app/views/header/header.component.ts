import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProfileService, SearchService } from '../../services/index';
import { Profile } from '../../services/profile/profile';

@Component({
    selector: 'header',
    styleUrls: ['src/dist/app/views/header/header.component.css'],
    templateUrl: 'src/dev/app/views/header/header.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SearchService]
})

export class HeaderComponent {
    public profile: Profile;
    public name: string;
    public errorMessage: string;
    private searchTermStream = new Subject();
    hideSearchResults: boolean = true;

    constructor(private profileService: ProfileService, private searchService: SearchService) { }    

    getProfile() {
        this.profileService.getProfile()
            .subscribe(
            (profile: Profile) => {
                    this.profile = profile;
                    this.name = this.profile.name;
                },
                error => this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.getProfile();
    }

    search(term: string) {
        this.hideSearchResults = false;

        this.searchTermStream.next(term);
    }

    items: Observable<string[]> = this.searchTermStream
        .debounceTime(150)
        .distinctUntilChanged()
        .switchMap((term: string) => this.searchService.search(term));
}