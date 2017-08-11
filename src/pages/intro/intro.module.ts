import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
// import { CommonModule } from '@angular/common';
// import { SharedModule } from '../../app/shared/shared.module';
import { IntroComponent } from './intro';

@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    IonicPageModule.forChild(IntroComponent)
  ]
})
export class IntroModule {}
