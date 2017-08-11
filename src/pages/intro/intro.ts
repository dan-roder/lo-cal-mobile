import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsComponent } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navHome() {
    this.navCtrl.setRoot('TabsComponent');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
