import { Component } from '@angular/core';
import { HTTP_PROVIDERS, Response } from '@angular/http';

import { ProfileService, SidebarService, AlertService } from '../../../services/index';
import { Profile } from '../../../services/profile/profile';
import { LoadingComponent } from '../../../common/loading/loading.component';
import { AlertComponent } from '../../../common/alert/alert.component';

@Component({
    selector: 'profile',
    styleUrls: ['src/dist/app/views/content/profile/profile.component.css'],
    templateUrl: 'src/dev/app/views/content/profile/profile.component.html',
    directives: [LoadingComponent, AlertComponent],
    providers: [AlertService]
})

export class ProfileComponent {
    constructor(private _profileService: ProfileService, private _sidebarService: SidebarService, private alertService: AlertService) { }

    profile: Profile;
    message: string;
    loading: boolean;
    profileLoading: boolean;
    requestState: boolean;

    getProfile() {
        this.profileLoading = true;

        this._profileService.getProfile()
            .subscribe(
                (profile: Profile) => {
                    this.profileLoading = false;

                    this.profile = profile;
                },
                error => this.handleError(error)
             );
    }

    saveProfile() {
        this.loading = true;

        this._profileService.setProfile(this.profile)
            .subscribe(
            profile => {
                this.loading = false;

                this.alertService.setMessage('Profile saved !');
                this.requestState = true;
            },
            error => this.handleError(error));
    }

    ngOnInit() {
        this._sidebarService.unSelectMenus(); 

        this.alertService.message$.subscribe(
            (message: string) => {
                this.message = message;
            });

        this.getProfile();
    }

    private handleError(error: Response) {
        setTimeout(() => {
            this.loading = false;
            this.profileLoading = false;
            this.requestState = false;

            this.alertService.setMessage(error.text() || 'Server error, please try again !');
        }, 3);
    }
}