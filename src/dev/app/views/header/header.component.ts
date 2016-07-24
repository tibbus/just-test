import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../services/profile/profile';

@Component({
    selector: 'header',
    styleUrls: ['src/dist/app/views/header/header.component.css'],
    templateUrl: 'src/dev/app/views/header/header.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
    constructor(private _profileService: ProfileService) { }    

    public profile: Profile; 
    public name: string;
    public errorMessage: string;   

    getProfile() {
        this._profileService.getProfile()
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
}