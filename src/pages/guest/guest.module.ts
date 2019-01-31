import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestPage } from './guest';

@NgModule({
  declarations: [
    GuestPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestPage),
  ],
  exports: [
    GuestPage
  ]
})
export class GuestPageModule {}
