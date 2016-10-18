import {NgModule}        from '@angular/core';
import {FormsModule}     from '@angular/forms';
import {RouterModule}    from '@angular/router';
import {UniversalModule} from 'angular2-universal';
import {AppRoutes}       from './client/app.routes';

import {AppComponent}    from './client/app.component';
import {HomeComponent}   from './client/home/home.component';
import {PageComponent}   from './client/page/page.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, PageComponent],
  imports: [
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule,
    RouterModule.forRoot(AppRoutes)
  ]
})
export class MainModule {}
