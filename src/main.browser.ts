import {NgModule}        from '@angular/core';
import {FormsModule}     from '@angular/forms';
import {RouterModule}    from '@angular/router';
import {UniversalModule} from 'angular2-universal';
import {MaterialModule}  from '@angular/material';
import {AppRoutes}       from './client/app.routes';

import {AppComponent}    from './client/app.component';
import {HomeComponent}   from './client/home/home.component';
import {PageComponent}   from './client/page/page.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PageComponent],
  imports: [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  bootstrap: [AppComponent]
})
export class MainModule {}
