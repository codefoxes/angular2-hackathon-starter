import {Component} from '@angular/core';
import {APP_CONFIG, config} from './config';

@Component({
  selector: 'app',
  providers: [
    {provide: APP_CONFIG, useValue: config}
  ],
  template: `
    <h1>My First Angular Universal App</h1>
    <nav>
      <a routerLink="/" routerLinkActive="active">Home</a>
      <a routerLink="/page" routerLinkActive="active">Page</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
