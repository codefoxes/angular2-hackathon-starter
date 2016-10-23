import {NgModule}        from '@angular/core';
import {FormsModule}     from '@angular/forms';
import {RouterModule}    from '@angular/router';
import {UniversalModule} from 'angular2-universal';
import {AppRoutes}       from './client/app.routes';

import {MaterialModule}  from '@angular/material';
import {NgbModule}       from '@ng-bootstrap/ng-bootstrap';

import {AppComponent}    from './client/app.component';
import {HomeComponent}   from './client/home/home.component';
import {PageComponent}   from './client/page/page.component';

import {config} from './client/config';

let importsArray = [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    FormsModule,
    RouterModule.forRoot(AppRoutes)
];

if (config.view.name === 'material') {
    importsArray.push(MaterialModule.forRoot());
} else if (config.view.name === 'bootstrap') {
    importsArray.push(NgbModule.forRoot());
}

@NgModule({
  declarations: [AppComponent, HomeComponent, PageComponent],
  imports: importsArray,
  bootstrap: [AppComponent]
})
export class MainModule {}
