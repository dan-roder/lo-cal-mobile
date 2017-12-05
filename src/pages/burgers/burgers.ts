import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-burgers",
  templateUrl: "burgers.html"
})
export class BurgersPage {
    menuItem;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams
    ) {

        console.log( this.navParams.get('menuItem') );
        this.menuItem = this.navParams.get("menuItem");
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BurgersPage");
  }
}
