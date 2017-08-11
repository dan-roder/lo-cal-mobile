import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedMediaComponent } from './featured-media/featured-media';
@NgModule({
	declarations: [FeaturedMediaComponent],
	imports: [
		CommonModule
	],
	exports: [FeaturedMediaComponent]
})
export class ComponentsModule {}
