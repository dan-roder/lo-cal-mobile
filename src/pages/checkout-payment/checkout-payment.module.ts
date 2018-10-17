import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPaymentPage } from './checkout-payment';

@NgModule({
  declarations: [
    CheckoutPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPaymentPage),
  ],
  exports: [
    CheckoutPaymentPage
  ]
})
export class CheckoutPaymentPageModule {}
