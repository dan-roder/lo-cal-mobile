import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { SuperTabsController } from "ionic2-super-tabs";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  tab1Root = 'MenuComponent';
  tab2Root = 'Tab2Component';


  constructor(

    public navCtrl: NavController, 
    public storage: Storage, 
    // private superTabsCtrl: SuperTabsController

  ) {}

  ionViewDidLoad() {
    this.storage.get('intro-done').then( done => {

      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot('IntroComponent');
      } else {

      }
    });
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
