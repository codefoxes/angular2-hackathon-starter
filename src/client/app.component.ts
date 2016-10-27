import {Component}   from '@angular/core';
import {Router}      from "@angular/router";
import {config}      from './config';
import {AuthService} from './auth/auth.service'

@Component({
    selector: 'app',
    template: require(`./${config.view.path}/app.component.html`),
    styles: [require(`./${config.view.path}/app.component.css`)]
})
export class AppComponent {
    constructor(private router: Router, private authService: AuthService) {}

    isActive(url: string): boolean {
        return this.router.isActive(url, true);
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
