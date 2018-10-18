import { Component } from "@angular/core";
import {
    Platform,
    AlertController,
    IonicPage,
    NavController,
    NavParams
} from "ionic-angular";

import { BagProvider } from "../../providers/bag/bag";
import { LineItem } from "../../models/LineItem";
import { MenuItemPage } from "../../pages/menu-item/menu-item";
import { CustomerProvider } from "../../providers/customer/customer";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: "page-bag",
    templateUrl: "bag.html"
})
export class BagPage {

    public itemsInBag: Array<LineItem>;
    public subtotal: number;
    public tax: number;
    public total: number;
    public isLoggedIn: string;

    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private bag: BagProvider,
        private customer: CustomerProvider,
        private storage: Storage
    ) {
        this.platform.ready().then(() => {
            this.itemsInBag = this.bag.itemsInBag;
            this.subtotal = this.calculateSubtotal(this.itemsInBag);
            this.tax = 0.0;
            this.total = this.subtotal + this.tax;
        });
    }
    ngOnInit() {
        // check if customer is logged in by pulling customer id from ionic storage
        this.storage.get("customerid").then(customer => {
            this.isLoggedIn = customer;
        });
    }

    backToMenu() {
        this.navCtrl.popToRoot();
    }

    calculateSubtotal(bagItems): number {
        let total = 0.0;
        bagItems.forEach(item => {
            total += parseFloat(item.ExtendedPrice);
        });
        return total;
    }

    removeItem(item, index) {
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
                        // console.log("Removed clicked");
                        this.bag.removeFromBagAtIndex(index);
                        this.subtotal = this.calculateSubtotal(this.itemsInBag);
                        this.tax = 0.0;
                        this.total = this.subtotal + this.tax;
                    }
                }
            ]
        });
        alert.present();
    }
    // goToItem(item, index) {
    //     console.log("edit item", item);

    //     this.bag.removeFromBagAtIndex(index);
    //     this.navCtrl.push("MenuItemPage", { menuItem: item });
    // }

    checkout(isGuest) {

        if(isGuest) {
          this.navCtrl.push("CheckoutReviewPage", {guest: true});
        } else {
          this.navCtrl.push("CheckoutReviewPage");
        }
    }
}
