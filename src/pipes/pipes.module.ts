import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { TruncatePipe } from './truncate.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';
import { AllergensPipe } from './allergens.pipe';

@NgModule({
    declarations: [
        TruncatePipe,
        TrimHtmlPipe,
        AllergensPipe
    ],
    imports: [CommonModule],
    exports: [
        TruncatePipe,
        TrimHtmlPipe,
        AllergensPipe
    ]
})
export class PipesModule { }
