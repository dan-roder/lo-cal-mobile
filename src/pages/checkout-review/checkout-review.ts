import { Component } from '@angular/core';

import {
    NavController,
    NavParams,
    IonicPage,
    LoadingController,
    AlertController
} from 'ionic-angular';
import { BagProvider } from "../../providers/bag/bag";
import { LineItem } from "../../models/LineItem";
import { Storage } from "@ionic/storage";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { CustomerProvider } from "../../providers/customer/customer";


@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-checkout-review',
  templateUrl: 'checkout-review.html',
})

export class CheckoutReviewPage {

    itemsInBag: Array<LineItem>;

  constructor(

      public navCtrl: NavController,
      public navParams: NavParams,
      private bag: BagProvider,
      private customer: CustomerProvider,
      private storage: Storage,
      private alertCtrl: AlertController,

  ) {

    this.itemsInBag = this.bag.itemsInBag
    console.log(this.itemsInBag)

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CheckoutReviewPage');
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }
  removeItem(item, index) {
    console.log("Item Removed");
    let alert = this.alertCtrl.create({
        title: "Confirm",
        message: "Are you sure you want to remove this item from your bag?",
        buttons: [
            {
                text: "No.",
                role: "cancel",
                cssClass: "button-cancel",
                handler: () => {
                    console.log("Cancel clicked");
                }
            },
            {
                text: "Yes.",
                cssClass: "button-accept",
                handler: () => {
                    console.log("Removed clicked");
                    this.bag.removeFromBagAtIndex(index);

                }
            }
        ]
    });
    alert.present();
}
}
