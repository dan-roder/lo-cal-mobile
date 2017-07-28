import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MenuComponent } from '../../menu/menu-component/menu.component';
import { Tab2Component } from '../../tab2/tab2-component/tab2.component';

import { IntroComponent } from '../../intro/intro-component/intro.component';
import {SuperTabsController} from "ionic2-super-tabs";

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  tab1Root = MenuComponent;
  tab2Root = Tab2Component;


  constructor(public navCtrl: NavController, public storage: Storage, private superTabsCtrl: SuperTabsController) {}

  ionViewDidLoad() {
    this.storage.get('intro-done').then( done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroComponent);
      } else {

      }
    });
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
