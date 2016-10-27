import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {isBrowser} from 'angular2-universal';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import {APP_CONFIG} from '../config';

@Injectable()
export class AuthService {
    public user = {};
    private loggedIn = false;
    private config;

    constructor (private http: Http, @Inject(APP_CONFIG) config) {
        this.config = config;
        if (isBrowser) {
            this.loggedIn = !!localStorage.getItem('auth_token');
        }
    }

    login(body: any) : Observable<any> {
        return this.http.post(`${this.config.rootUrl}/api/v1/login`, body)
            .map(res => res.json())
            .map((res: any) => {
                if (res.success) {
                    localStorage.setItem('auth_token', res.token);
                    this.loggedIn = true;
                }
                return res.success;
            });
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    logout() {
        document.cookie = 'XSRF-TOKEN=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }
}
