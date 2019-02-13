import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutReviewPage } from './checkout-review';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CheckoutReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutReviewPage),
    PipesModule,
    DirectivesModule,
  ],
  exports: [
    CheckoutReviewPage
  ]
})
export class CheckoutReviewPageModule {}
