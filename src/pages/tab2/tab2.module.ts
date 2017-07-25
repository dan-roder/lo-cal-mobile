import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { Tab2Component } from './tab2-component/tab2.component';

@NgModule({
  declarations: [
    Tab2Component
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    Tab2Component
  ],
  entryComponents:[
    Tab2Component
  ]
})
export class Tab2Module {}
