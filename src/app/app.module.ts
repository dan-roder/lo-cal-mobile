import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { StoryPage } from '../pages/story/story';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { Tab1Page } from '../pages/tab1/tab1';
import { Tab2Page } from '../pages/tab2/tab2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    StoryPage,
    ListPage,
    TabsPage,
    Tab1Page,
    Tab2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    StoryPage,
    ListPage,
    TabsPage,
    Tab1Page,
    Tab2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
