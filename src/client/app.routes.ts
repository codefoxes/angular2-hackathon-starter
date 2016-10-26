import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageComponent} from './page/page.component';
import {LoginComponent} from './auth/login.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'page', component: PageComponent},
  {path: 'login', component: LoginComponent},
];
