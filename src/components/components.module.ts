import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedMediaComponent } from './featured-media/featured-media';
import { AllergensModalComponent } from './allergens-modal/allergens-modal';

@NgModule({
	declarations: [
    FeaturedMediaComponent,
    AllergensModalComponent
  ],
	imports: [
		CommonModule
	],
	exports: [
    FeaturedMediaComponent,
    AllergensModalComponent
  ]
})
export class ComponentsModule {}
