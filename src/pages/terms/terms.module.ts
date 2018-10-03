import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPage } from './terms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TermsPage
  ],
  imports: [
    IonicPageModule.forChild(TermsPage),
    PipesModule
  ]
})
export class TermsPageModule {}
