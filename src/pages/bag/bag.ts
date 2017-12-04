import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the BagPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-bag',
    templateUrl: 'bag.html',
})
export class BagPage {

    constructor(
        public navCtrl:    NavController,
        public navParams:  NavParams,
        private alertCtrl: AlertController

    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad BagPage');
    }

    removeItem() {
        console.log("Item Removed");
        let alert = this.alertCtrl.create({
          title: "Confirm",
          message: "Are you sure you want to remove this item from your bag?",
          buttons: [
            {
              text: "No.",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Yes.",
              handler: () => {
                console.log("Removed clicked");
              }
            }
          ]
        });
        alert.present();
    }

}
