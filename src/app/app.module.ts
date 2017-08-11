import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
// import { SharedModule } from './shared/shared.module';

import { MODULES, PROVIDERS } from './app.imports';


@NgModule({
  declarations: [

    MyApp

  ],
  imports: [

    MODULES,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [

    MyApp

  ],
  providers: [

    PROVIDERS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
