import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { Tab1Component } from './tab1-component/tab1.component';

@NgModule({
  declarations: [
    Tab1Component
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    Tab1Component
  ],
  entryComponents:[
    Tab1Component
  ]
})
export class Tab1Module {}
