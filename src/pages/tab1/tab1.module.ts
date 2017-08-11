import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
// import { SharedModule } from '../../app/shared/shared.module';
import { Tab1Component } from './tab1';

@NgModule({
  declarations: [
    Tab1Component
  ],
  imports: [
    // SharedModule,
    IonicPageModule.forChild(Tab1Component)
  ]
})
export class Tab1Module {}
