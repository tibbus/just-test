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

    public profile: Profile;
    public name: string;
    public errorMessage: string;
    private loading: boolean;

    getProfile() {
        this._profileService.getProfile()
            // TODO : testing delay, to be removed
            .delay(3000)
            .subscribe(
            profile => {
                this.profile = profile;
            },
            error => this.handleError(error));
    }

    saveProfile() {
        this.errorMessage = null;
        this.loading = true;

        this._profileService.setProfile(this.profile)
            .subscribe(
            profile => {
                this.loading = false;
            },
            error => this.handleError(error));
    }

    ngOnInit() {
        this.getProfile();
    }

    private handleError(error: Response) {
    // TODO : testing delay, to be removed
        setTimeout(() => {
            this.loading = false;

            this.errorMessage = error.text() || 'Server error, please try again !';
        }, 3000);
    }
}