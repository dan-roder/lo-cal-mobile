import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPage } from './blog';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BlogPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogPage),
    PipesModule
  ],
  exports: [
    BlogPage
  ]
})
export class BlogPageModule {}
