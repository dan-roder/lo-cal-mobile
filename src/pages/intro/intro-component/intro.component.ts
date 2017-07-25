import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsComponent } from '../../tabs/tabs-component/tabs.component';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navHome() {
    this.navCtrl.setRoot(TabsComponent);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
