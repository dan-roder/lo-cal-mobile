import { Component } from '@angular/core';
import { Platform, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { BagProvider } from '../../providers/bag/bag';
import { LineItem } from '../../models/LineItem';

@IonicPage()
@Component({
    selector: 'page-bag',
    templateUrl: 'bag.html',
})
export class BagPage {

    itemsInBag : Array<LineItem>;
    subtotal   : number;
    tax        : number;
    total      : number;

    constructor(
        public  platform  : Platform,
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private alertCtrl : AlertController,
        private bag       : BagProvider
    ) {

        this.platform.ready().then( () => {

            console.log( this.bag.itemsInBag );
            this.itemsInBag = this.bag.itemsInBag;
            this.subtotal = this.calculateSubtotal( this.itemsInBag );
            this.tax = 0.00;
            this.total = this.subtotal + this.tax;

        });

    }

    ionViewDidLoad() {


    }

    ionViewCanLeave() {
        this.navCtrl.popToRoot();
    }

    backToMenu() {
        this.navCtrl.popToRoot();
    }
    calculateSubtotal( bagItems ):number {

        let total = 0.00;
        bagItems.forEach( item => {

            total += parseFloat( item.ExtendedPrice );

        });
        return total;

    }

    removeItem( item, index ) {
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
                        this.bag.removeFromBagAtIndex( index );

                        this.subtotal = this.calculateSubtotal( this.itemsInBag );
                        this.tax = 0.00;
                        this.total = this.subtotal + this.tax;

                    }
                }
            ]
        });
        alert.present();
    }

}
