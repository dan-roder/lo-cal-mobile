import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyPage } from './privacy';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyPage),
    PipesModule
  ],
  exports: [
    PrivacyPage
  ]
})
export class PrivacyPageModule {}
