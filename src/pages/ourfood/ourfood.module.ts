import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurfoodComponent } from './ourfood';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OurfoodComponent
  ],
  imports: [
    IonicPageModule.forChild(OurfoodComponent),
    PipesModule,
    ComponentsModule
  ]
})
export class OurfoodModule {}
