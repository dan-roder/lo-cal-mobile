import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllergenModalPage } from './allergen-modal';

@NgModule({
  declarations: [
    AllergenModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AllergenModalPage),
  ],
  exports: [
    AllergenModalPage
  ]
})
export class AllergenModalPageModule {}
