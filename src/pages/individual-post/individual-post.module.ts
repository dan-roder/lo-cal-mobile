import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividualPostPage } from './individual-post';

@NgModule({
  declarations: [
    IndividualPostPage,
  ],
  imports: [
    IonicPageModule.forChild(IndividualPostPage),
    PipesModule
  ],
  exports: [
    IndividualPostPage
  ]
})
export class IndividualPostPageModule {}
