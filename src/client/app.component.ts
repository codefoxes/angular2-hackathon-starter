import {Component} from '@angular/core';
import {APP_CONFIG, config} from './config';

@Component({
  selector: 'app',
  providers: [
    {provide: APP_CONFIG, useValue: config}
  ],
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent {}
