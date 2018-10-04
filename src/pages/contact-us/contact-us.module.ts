import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    PipesModule
  ],
  exports: [
    ContactUsPage
  ]
})
export class ContactUsPageModule {}
