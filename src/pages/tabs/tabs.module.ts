import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsComponent } from './tabs';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(TabsComponent)
  ]
})
export class TabsModule {}
