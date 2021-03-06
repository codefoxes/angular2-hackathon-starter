import {Injectable, Inject} from '@angular/core';
import {Http}       from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {APP_CONFIG} from '../config';

@Injectable()
export class PageService {
    config;

    constructor (private http: Http, @Inject(APP_CONFIG) config) {
        this.config = config;
    }

    getList() : Observable<any> {
        return this.http.get(`${this.config.rootUrl}/api/v1/page`)
            .map(res => res.json());
    }
}
