import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './ionic/app.component';
import { ContactPage } from './ionic/pages/contact/contact';
import { HomePage } from './ionic/pages/home/home';
import { TabsPage } from './ionic/pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: []
})
export class MainModule {}
