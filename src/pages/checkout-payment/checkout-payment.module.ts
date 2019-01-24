import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPaymentPage } from './checkout-payment';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CheckoutPaymentPage,
  ],
  imports: [
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(CheckoutPaymentPage),
  ],
  exports: [
    CheckoutPaymentPage
  ]
})
export class CheckoutPaymentPageModule {}
