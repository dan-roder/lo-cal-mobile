import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';

import { OurstoryComponent } from './ourstory-component/ourstory.component';
import { OurfoodComponent } from './ourfood-component/ourfood.component';

import { FeaturedMedia } from './featured-media-component/featured-media.component';


@NgModule({
  declarations: [
    OurstoryComponent,
    OurfoodComponent,
    FeaturedMedia
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    OurstoryComponent,
    OurfoodComponent,
    FeaturedMedia
  ],
  entryComponents:[
    OurstoryComponent,
    OurfoodComponent,
    FeaturedMedia
  ]
})
export class MarketingPagesModule {}
