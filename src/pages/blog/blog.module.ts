import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPage } from './blog';

@NgModule({
  declarations: [
    BlogPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogPage),
  ],
  exports: [
    BlogPage
  ]
})
export class BlogPageModule {}
