import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutReviewPage } from './checkout-review';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CheckoutReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutReviewPage),
    PipesModule
  ],
  exports: [
    CheckoutReviewPage
  ]
})
export class CheckoutReviewPageModule {}
