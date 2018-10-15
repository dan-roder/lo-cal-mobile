import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutReviewPage } from './checkout-review';

@NgModule({
  declarations: [
    CheckoutReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutReviewPage),
  ],
  exports: [
    CheckoutReviewPage
  ]
})
export class CheckoutReviewPageModule {}
