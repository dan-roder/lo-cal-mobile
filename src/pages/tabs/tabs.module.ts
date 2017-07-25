import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { TabsComponent } from './tabs-component/tabs.component';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SuperTabsModule
  ],
  exports: [
    TabsComponent
  ],
  entryComponents:[
    TabsComponent
  ]
})
export class TabsModule {}
