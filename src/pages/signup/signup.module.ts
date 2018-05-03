import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../../directives/directives.module';
import { SignupPage } from './signup';

@NgModule({
    declarations: [
        SignupPage
    ],
    imports: [
        DirectivesModule,
        IonicPageModule.forChild(SignupPage),
    ],
    exports: [
        SignupPage
    ]
})
export class SignupPageModule { }
