import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { IntroComponent } from './intro-component/intro.component';

@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    IntroComponent
  ],
  entryComponents:[
    IntroComponent
  ]
})
export class IntroModule {}
