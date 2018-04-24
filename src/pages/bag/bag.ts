import { Component } from '@angular/core';
import { Platform, AlertController, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BagProvider } from '../../providers/bag/bag';
import { LineItem, LineItemModifier } from '../../models/LineItem';

@IonicPage()
@Component({
    selector: 'page-bag',
    templateUrl: 'bag.html',
})
export class BagPage {

    itemsInBag : Array<LineItem> = [];
    subtotal : number;
    tax : number;
    total : number;

    constructor(
        public  platform  : Platform,
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private alertCtrl : AlertController,
        private bag       : BagProvider
    ) {

        this.platform.ready().then( () => {

            let bagWatcher = this.bag.watchBag().subscribe( bag => {

                console.log( bag );
                if ( bag ) {

                    this.itemsInBag = bag;
                    this.subtotal = this.calculateSubtotal( bag );
                    this.tax = 0.00;
                    this.total = this.subtotal + this.tax;
                }


            });
            // console.log( this.itemsInBag );

        });

    }

    ionViewDidLoad() {

        // console.log('ionViewDidLoad BagPage');
        // this.itemsInBag = this.bag.itemsInBag;
        // console.log( this.itemsInBag );

    }

    calculateSubtotal( bag ):number {

        let total = 0.00;
        bag.forEach( item => {

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
                    handler: () => {
                        console.log("Cancel clicked");
                    }
                },
                {
                    text: "Yes.",
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
