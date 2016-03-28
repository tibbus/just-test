import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Response}    from 'angular2/http';
import {ProfileService} from '../../../profile/profile.service';
import {Profile} from '../../../profile/profile';

@Component({
    selector: 'profile',
    styleUrls: ['src/dist/app/views/content/profile/profile.component.css'],
    templateUrl: 'src/dev/app/views/content/profile/profile.component.html',
    providers: [HTTP_PROVIDERS, ProfileService]
})

export class ProfileComponent {
    constructor(private _profileService: ProfileService) { }

    public profile: Profile = { Id: null};
    public name: string;
    public errorMessage: string;
    private loading: boolean;

    getProfile() {
        this._profileService.getProfile()
            .debounceTime(2000)
            .subscribe(
            profile => {
                this.profile = profile;
            },
            error => this.handleError(error));
    }

    saveProfile() {
        console.log('save Profile');
        this.loading = true;

        this._profileService.setProfile(this.profile)
            .debounceTime(2000)
            .subscribe(
            profile => {
                this.loading = false;

                console.log('success');
            },
            error => this.handleError(error));
    }

    ngOnInit() {
        this.getProfile();
    }

    private handleError(error: Response) {
        this.loading = false;

        this.errorMessage = error.text() || 'Server error';
    }
}