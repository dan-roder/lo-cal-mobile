import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPaymentPage } from './checkout-payment';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
import { CreditCardDirectivesModule } from 'angular-cc-library';

@NgModule({
  declarations: [
    CheckoutPaymentPage,
  ],
  imports: [
    DirectivesModule,
    PipesModule,
    CreditCardDirectivesModule,
    IonicPageModule.forChild(CheckoutPaymentPage),
  ],
  exports: [
    CheckoutPaymentPage
  ]
})
export class CheckoutPaymentPageModule {}
