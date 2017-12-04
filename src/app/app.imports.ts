// Ionic native providers
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

// Providers
import { Config } from './app.config';
import { WordPressProvider } from '../providers/word-press/word-press';
import { LoCalApiProvider } from '../providers/lo-cal-api/lo-cal-api';
import { MenuProvider } from "../providers/menu/menu";

// Directives

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ComponentsModule } from "../components/components.module";
import { SuperTabsModule } from 'ionic2-super-tabs';

// Exports

export const MODULES = [

    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    PipesModule,
    SuperTabsModule.forRoot()

];

export const PROVIDERS = [
    Config,
    WordPressProvider,
    LoCalApiProvider,
    MenuProvider,
    // Ionic native specific providers
    InAppBrowser,
    StatusBar,
    SplashScreen

];

// Components Exported as module
// export const COMPONENTS = [];

export const DIRECTIVES = [];
