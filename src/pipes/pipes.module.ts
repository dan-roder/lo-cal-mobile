import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { TruncatePipe } from './truncate.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';
import { AllergensPipe } from './allergens.pipe';
import { CardImagePipe } from './image.pipe';
import { SafeHtml } from './safe-html.pipe'
import { FeaturedImagePipe } from './featured-image.pipe'
@NgModule({
    declarations: [
        TruncatePipe,
        TrimHtmlPipe,
        AllergensPipe,
        CardImagePipe,
        SafeHtml,
        FeaturedImagePipe
    ],
    imports: [CommonModule],
    exports: [
        TruncatePipe,
        TrimHtmlPipe,
        AllergensPipe,
        CardImagePipe,
        SafeHtml,
        FeaturedImagePipe
    ]
})
export class PipesModule { }
