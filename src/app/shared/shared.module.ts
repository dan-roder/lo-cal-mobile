import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SuperTabsModule } from 'ionic2-super-tabs';

// import { SocialSharing } from '@ionic-native/social-sharing';
// import { Facebook } from '@ionic-native/facebook';
// import { EmailComposer } from '@ionic-native/email-composer';

import { TruncatePipe } from './pipes/truncate.pipe';
import { TrimHtmlPipe } from './pipes/trim-html.pipe';

import { Config } from '../app.config';

@NgModule({
  declarations: [
    TruncatePipe,
    TrimHtmlPipe
  ],
  imports: [
    BrowserModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    CommonModule,
    HttpModule,
    SuperTabsModule.forRoot(),
  ],
  exports: [
    BrowserModule,
    HttpModule,
    IonicModule,
    TruncatePipe,
    TrimHtmlPipe
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    // SocialSharing,
    // Facebook,
    // EmailComposer,
    Config
  ]
})
export class SharedModule {}
