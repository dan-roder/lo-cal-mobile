import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedMediaComponent } from './featured-media/featured-media';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
    FeaturedMediaComponent
  ],
	imports: [
    IonicModule,
		CommonModule
	],
	exports: [
    FeaturedMediaComponent
  ]
})
export class ComponentsModule {}
