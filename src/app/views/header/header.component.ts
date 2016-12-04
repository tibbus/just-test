import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProfileService, SearchService, FollowService, SidebarService, AuthService, StreamService } from '../../services/index';
import { Profile } from '../../services/profile/profile';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'header',
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html',
    providers: [SearchService, StreamService, FollowService],
    host: {
        '(document:click)': 'onClickOutside($event)',
    },
})

export class HeaderComponent {
    public profile: Profile;
    public name: string;
    public errorMessage: string;
    private searchTermStream = new Subject();
    hideSearchResults: boolean = true;
    followState: boolean;
    public isFollowEnabled: boolean = true;

    constructor(
        private profileService: ProfileService,
        private searchService: SearchService,
        private followService: FollowService,
        private router: Router,
        private sidebarService: SidebarService,
        private authService: AuthService
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

        this.followService.getPosts().subscribe();

        this.followService.isUserFollowing$().subscribe((state: boolean) => {
            this.followState = state;
        })

        this.followService.getFollowState$().subscribe((state: boolean) => {
            this.isFollowEnabled = state;
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
        });
    }

    onClickUnFollow() {
        this.followService.unFollowCar().subscribe(data => {
            this.followState = false;
        });
    }

    onClickOutside($event: EventListener) {
        this.hideSearchResults = true;
    }

    onClickSearchResult(car) {
        const routeFromCar = `${car.Make}-${car.Model}-${car.CarInfoId}`;
        const parsedRouteFromCar = routeFromCar.replace(/ /g, '-');

        this.router.navigate(['/cars', parsedRouteFromCar]).then(() => {
            this.sidebarService.setCarMenu$(null);
        }); 
    }

    clickSignOut() {
        this.authService.signOut();
    }

    clickLogin() {
        this.authService.signIn();
    }
}