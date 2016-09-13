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
    followState: boolean;
    isFollowEnabled: boolean = true;

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

        this.followService.getPosts().subscribe(data => {
            this.followService.carFollowers = data;
        });

        this.followService.following$.subscribe((data: boolean) => {
            this.followState = data;
        })

        this.followService.isFollowEnable$.subscribe((data: boolean) => {
            this.isFollowEnabled = data;
        })
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
            this.followState = true;

            this.followService.getPosts();
        });
    }

    onClickUnFollow() {
        this.followService.unFollowCar().subscribe(data => {
            this.followState = false;

            this.followService.getPosts();
        });
    }
}