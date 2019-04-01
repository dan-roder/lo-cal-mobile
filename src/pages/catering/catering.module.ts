import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringPage } from './catering';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CateringPage
  ],
  imports: [
    IonicPageModule.forChild(CateringPage),
    PipesModule
  ],
  exports: [
    CateringPage
  ]
})
export class CateringPageModule {}
