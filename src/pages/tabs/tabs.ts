import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Tab2Page } from '../tab2/tab2';

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
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Tab2Page;


  constructor(public navCtrl: NavController, private superTabsCtrl: SuperTabsController) {}

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
