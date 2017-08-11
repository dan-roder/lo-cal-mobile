import { NgModule } from '@angular/core';

import { TruncatePipe } from './truncate.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';

@NgModule({
  declarations: [
    TruncatePipe,
    TrimHtmlPipe
  ],
  imports: [],
  exports: [
    TruncatePipe,
    TrimHtmlPipe
  ]
})
export class PipesModule {}
