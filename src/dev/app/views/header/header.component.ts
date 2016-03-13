import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {ProfileService} from '../../profile/profile.service';

@Component({
    selector: 'header',
    styleUrls: ['src/dist/app/views/header/header.component.css'],
    templateUrl: 'src/dev/app/views/header/header.component.html',
    providers: [HTTP_PROVIDERS, ProfileService]
})

export class HeaderComponent {
    constructor(private _profileService: ProfileService) { }    

    public profile: any;
    public errorMessage: any;   
    public name: string; 

    getProfile() {
        this._profileService.getProfile()
            .then(
            profile => {
                this.profile = profile;
                this.name = this.profile.Name;
            },
            error => this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.getProfile();
    }
}