import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { PipesModule } from '../../pipes/pipes.module';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    PipesModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports: [
    ContactUsPage
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6LefV3EUAAAAAH7Xzi3J1jRu4y-W3usgOdOu9xlr' } as RecaptchaSettings,
  }],
})
export class ContactUsPageModule {}
