import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS, Response } from '@angular/http';

import { ProfileService, SidebarService, AlertService } from '../../../services/index';
import { Profile } from '../../../services/profile/profile';
import { LoadingComponent } from '../../../common/loading/loading.component';
import { AlertComponent } from '../../../common/alert/alert.component';

@Component({
    selector: 'profile',
    styleUrls: ['src/dist/app/views/+content/profile/profile.component.css'],
    templateUrl: 'src/dev/app/views/+content/profile/profile.component.html',
    directives: [LoadingComponent, AlertComponent],
    providers: [AlertService]
})

export class ProfileComponent implements OnInit {
    profile: Profile;
    message: string;
    loading: boolean;
    profileLoading: boolean;
    requestState: boolean;

    constructor(private profileService: ProfileService, private sidebarService: SidebarService, private alertService: AlertService) { }

    ngOnInit() {
        this.sidebarService.unSelectMenus();

        this.alertService.message$.subscribe(
            (message: string) => {
                this.message = message;
            });

        this.getProfile();
    }

    getProfile() {
        // Start loading
        this.profileLoading = true;

        this.profileService.getProfile()
            .subscribe(
            (profile: Profile) => {
                    // End loading
                    this.profileLoading = false;

                    this.profile = profile;
                },
                error => this.handleError(error)
             );
    }

    saveProfile() {
        // Start loading
        this.loading = true;

        this.profileService.setProfile(this.profile)
            .subscribe(
            profile => {
                // End loading
                this.loading = false;

                this.alertService.setMessage('Profile saved !');
                this.requestState = true;
            },
            error => this.handleError(error));
    }

    private handleError(error: Response) {
        setTimeout(() => {
            // End loading
            this.loading = false;
            this.profileLoading = false;
            this.requestState = false;

            this.alertService.setMessage(error.text() || 'Server error, please try again !');
        }, 3);
    }
}