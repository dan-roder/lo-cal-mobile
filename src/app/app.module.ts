import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { MODULES, PROVIDERS, DIRECTIVES } from './app.imports';


@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        MODULES,
        DIRECTIVES,
        IonicModule.forRoot(MyApp, {
            autocomplete: 'on'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        PROVIDERS,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ]
})
export class AppModule { }
