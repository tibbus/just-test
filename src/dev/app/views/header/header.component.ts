import {Component} from 'angular2/core';
import {ProfileService} from '../../services/profile/profile.service';
import {Profile} from '../../services/profile/profile';
import {ROUTER_DIRECTIVES} from 'angular2/router';

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