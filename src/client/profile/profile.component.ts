import {Component}      from '@angular/core';
import {config}         from '../config';
import {ProfileService} from './profile.service';

@Component({
    selector: 'profile',
    providers: [ProfileService],
    template: require(`../${config.view.path}/profile/profile.component.html`)
})
export class ProfileComponent {
    profile = {};

    constructor(private profileService: ProfileService){
        profileService.getProfile()
            .subscribe(
                res => {
                    this.profile = res.user;
                },
                err => console.log(`Couldn't fetch url`)
            );
    }
}
