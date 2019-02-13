import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    PipesModule
  ],
  exports: [
    AccountPage
  ]
})
export class AccountPageModule {}
