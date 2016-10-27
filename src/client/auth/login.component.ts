import {Component}   from '@angular/core';
import {Router}      from '@angular/router';
import {AuthService} from './auth.service'
import {config}      from '../config';

@Component({
    selector: 'login',
    template: require(`../${config.view.path}/auth/login.component.html`),
    styles: [require(`../${config.view.path}/auth/login.component.css`)]
})
export class LoginComponent {
    public username: string;
    public password: string;

    constructor(private authService: AuthService, private router: Router) {}

    /**
     * @todo Handle Error
     */
    onSubmit() {
        let body = {username: this.username, password: this.password};
        this.authService.login(body)
            .subscribe(
                res => {
                    if (res) this.router.navigate(['']);
                    // Else show error
                },
                err => console.log(`Couldn't login`)
            );
    }
}
