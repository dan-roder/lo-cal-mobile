import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurfoodComponent } from './ourfood';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    OurfoodComponent
  ],
  imports: [
    IonicPageModule.forChild(OurfoodComponent),
    ComponentsModule
  ]
})
export class OurfoodModule {}
