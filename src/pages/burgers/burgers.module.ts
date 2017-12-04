import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BurgersPage } from './burgers';

@NgModule({
  declarations: [
    BurgersPage,
  ],
  imports: [
    IonicPageModule.forChild(BurgersPage),
  ],
  exports: [
    BurgersPage
  ]
})
export class BurgersPageModule {}
