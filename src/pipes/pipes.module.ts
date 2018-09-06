import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { TruncatePipe } from './truncate.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';
import { AllergensPipe } from './allergens.pipe';
import { CardImagePipe } from './image.pipe';
@NgModule({
    declarations: [
        TruncatePipe,
        TrimHtmlPipe,
        AllergensPipe,
        CardImagePipe
    ],
    imports: [CommonModule],
    exports: [
        TruncatePipe,
        TrimHtmlPipe,
        AllergensPipe,
        CardImagePipe
    ]
})
export class PipesModule { }
