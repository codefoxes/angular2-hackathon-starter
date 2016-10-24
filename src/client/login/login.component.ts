import {Component} from '@angular/core';
import {config} from '../config';

@Component({
    selector: 'login',
    template: require(`../${config.view.path}/login/login.component.html`),
    styles: [require(`../${config.view.path}/login/login.component.css`)]
})
export class LoginComponent {}
