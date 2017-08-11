import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
// import { SharedModule } from '../../app/shared/shared.module';
import { Tab2Component } from './tab2';

@NgModule({
  declarations: [
    Tab2Component
  ],
  imports: [
    // SharedModule,
    IonicPageModule.forChild(Tab2Component)
  ]
})
export class Tab2Module {}
