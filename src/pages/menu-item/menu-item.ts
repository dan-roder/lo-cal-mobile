import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-menu-item",
  templateUrl: "menu-item.html"
})
export class MenuItemPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuItemPage");
    // document.body.classList.add("fullscreen");
  }

  ionViewWillEnter() {
    document.body.classList.add("fullscreen");
  }

  ionViewWillLeave() {
    document.body.classList.remove("fullscreen");
  }
}
