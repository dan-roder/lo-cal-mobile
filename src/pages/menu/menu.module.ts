import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { SharedModule } from '../../app/shared/shared.module';
import { MenuComponent } from './menu';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    // SharedModule,
    IonicPageModule.forChild(MenuComponent)
  ]
})
export class MenuModule {}
