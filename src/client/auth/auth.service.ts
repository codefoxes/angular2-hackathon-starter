import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {APP_CONFIG} from '../config';

@Injectable()
export class AuthService {
    public user = {};
    private loggedIn = false;
    private config;

    constructor (private http: Http, @Inject(APP_CONFIG) config) {
        this.config = config;
    }

    login(body: any) : Observable<any> {
        return this.http.post(`${this.config.rootUrl}/api/v1/login`, body)
            .map(res => res.json())
            .map((res: any) => {
                if (res.success) {
                    this.loggedIn = true;
                }
                return res.success;
            });
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
