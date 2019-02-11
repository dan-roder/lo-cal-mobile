import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { TruncatePipe } from './truncate.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';
import { NoXPipe } from './no-x.pipe';
import { AllergensPipe } from './allergens.pipe';
import { CardImagePipe } from './image.pipe';
import { SafeHtml } from './safe-html.pipe';
import { FeaturedImagePipe } from './featured-image.pipe';
import { CardTypePipe } from './card-type.pipe';
@NgModule({
  declarations: [
    TruncatePipe,
    TrimHtmlPipe,
    NoXPipe,
    AllergensPipe,
    CardImagePipe,
    SafeHtml,
    FeaturedImagePipe,
    CardTypePipe
  ],
  imports: [CommonModule],
  exports: [
    TruncatePipe,
    TrimHtmlPipe,
    NoXPipe,
    AllergensPipe,
    CardImagePipe,
    SafeHtml,
    FeaturedImagePipe,
    CardTypePipe
  ]
})
export class PipesModule { }
