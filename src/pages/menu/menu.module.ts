import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { MenuComponent } from './menu-component/menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MenuComponent
  ],
  entryComponents:[
    MenuComponent
  ]
})
export class MenuModule {}
