import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HTTP_PROVIDERS, Response } from '@angular/http';

import { ProfileService, SidebarService } from '../../../services/index';
import { Profile } from '../../../services/profile/profile';
import { LoadingComponent } from '../../../common/loading/loading.component';
import { AlertComponent } from '../../../common/alert/alert.component';

@Component({
    selector: 'profile',
    styleUrls: ['src/dist/app/views/+content/profile/profile.component.css'],
    templateUrl: 'src/dev/app/views/+content/profile/profile.component.html',
    directives: [LoadingComponent, AlertComponent]
})

export class ProfileComponent implements OnInit {
    profile: Profile;
    alertMessage: string;
    loading: boolean;
    profileLoading: boolean;
    requestState: boolean;

    constructor(
        private profileService: ProfileService,
        private sidebarService: SidebarService,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.sidebarService.unSelectMenus();

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

                //this.alertService.setMessage('Profile saved !');
                this.alertMessage = 'Profile saved !';
                this.requestState = true;
            },
            error => this.handleError(error));
    }

    // @Output : reset the message on alert Close
    resetAlertMessage() {
        this.alertMessage = null;
    }

    private handleError(error: Response) {
        setTimeout(() => {
            // End loading
            this.loading = false;
            this.profileLoading = false;
            this.requestState = false;

            this.alertMessage = error.text() || 'Server error, please try again !';
        }, 3);
    }
}