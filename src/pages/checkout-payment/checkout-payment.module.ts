import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPaymentPage } from './checkout-payment';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CheckoutPaymentPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(CheckoutPaymentPage),
  ],
  exports: [
    CheckoutPaymentPage
  ]
})
export class CheckoutPaymentPageModule {}
