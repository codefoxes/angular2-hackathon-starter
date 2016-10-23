import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {APP_CONFIG, config} from './config';

@Component({
  selector: 'app',
  providers: [
    {provide: APP_CONFIG, useValue: config}
  ],
  template: require(`./${config.view.path}/app.component.html`),
  styles: [require(`./${config.view.path}/app.component.css`)]
})
export class AppComponent {
  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }
}
