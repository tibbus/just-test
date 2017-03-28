import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    public loading: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.authService.getUser()) {
            this.router.navigateByUrl('/feed');
        }
    }

    public clickSignIn(socialMediaType: string) {
        if (this.loading) {
            return;
        }

        this.loading = socialMediaType;

        this.authService.signIn(socialMediaType);
    }
}