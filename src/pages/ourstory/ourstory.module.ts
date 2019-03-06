import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { OurstoryComponent } from './ourstory';
// import { CommonModule } from '@angular/common';
// import { SharedModule } from '../../app/shared/shared.module';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    OurstoryComponent
  ],
  imports: [

    IonicPageModule.forChild(OurstoryComponent),
    // CommonModule,
    // SharedModule,
    PipesModule,
    ComponentsModule

  ]
})
export class OurstoryModule {}
