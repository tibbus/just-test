import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProfileService, SearchService, FollowService } from '../../services/index';
import { Profile } from '../../services/profile/profile';

@Component({
    selector: 'header',
    styleUrls: ['src/dist/app/views/header/header.component.css'],
    templateUrl: 'src/dev/app/views/header/header.component.html',
    providers: [SearchService]
})

export class HeaderComponent {
    public profile: Profile;
    public name: string;
    public errorMessage: string;
    private searchTermStream = new Subject();
    hideSearchResults: boolean = true;
    followState: string;

    constructor(
        private profileService: ProfileService,
        private searchService: SearchService,
        private followService: FollowService
    ) { }    

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
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.searchService.search(term));

    onClickFollow() {
        this.followService.followCar().subscribe(data => {
            this.followState = 'follow';
        });
    }

    onClickUnFollow() {
        this.followService.unFollowCar().subscribe(data => {
            this.followState = 'unFollow';
        });
    }
}