import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {ProfileService} from '../../profile/profile.service';
import {Profile} from '../../profile/profile';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'header',
    styleUrls: ['src/dist/app/views/header/header.component.css'],
    templateUrl: 'src/dev/app/views/header/header.component.html',
    providers: [HTTP_PROVIDERS, ProfileService],
    directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
    constructor(private _profileService: ProfileService) { }    

    public profile: Profile; 
    public name: string;
    public errorMessage: string;   

    getProfile() {
        this._profileService.getProfile()
            .then(profile => {
                this.profile = profile;
                this.name = this.profile.Name;
            },
            error => this.errorMessage = <string>error);
    }

    ngOnInit() {
        this.getProfile();
    }
}