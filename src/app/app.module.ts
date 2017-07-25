import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';

import { SharedModule } from './shared/shared.module';

import { IntroModule } from '../pages/intro/intro.module';
import { HomeModule } from '../pages/home/home.module';
import { ListModule } from '../pages/list/list.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { Tab1Module } from '../pages/tab1/tab1.module';
import { Tab2Module } from '../pages/tab2/tab2.module';
import { AppPagesModule } from '../pages/appPages/appPages.module';

@NgModule({
  declarations: [

    MyApp

  ],
  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp),
    SharedModule,
    IntroModule,
    HomeModule,
    ListModule,
    TabsModule,
    Tab1Module,
    Tab2Module,
    AppPagesModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [

    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
