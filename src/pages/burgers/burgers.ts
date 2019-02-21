import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
import { SubMenu } from "../../models/subMenu";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { WordPressProvider } from '../../providers/word-press/word-press';
import * as _ from 'lodash';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()
@Component({
    selector: "page-burgers",
    templateUrl: "burgers.html"
})

export class BurgersPage implements OnInit {

    public subMenuObserver  : Subscription;
    public menuItemObserver : Subscription;
    // menuObserver     : Subscription;
    public testSubMenu      : Observable<Object>;
    public subMenuMeta      : SubMenu;
    public subMenu          : Observable<Object>;
    public customData       : Object = {};
    public cartImage        : string = '';
    public menuSlug         : any;
    public menuMap          : any;
    public wpSubMenuItems   : any;

    constructor(

        public  app       : App,
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        public  loading   : LoadingController,
        private alertCtrl : AlertController,
        private menu      : MenuProvider,
        private bag       : BagProvider,
        private wpService : WordPressProvider,

    ) {}

    ngOnInit() {

        let loading = this.loading.create({
            content: "Loading Menu ... ",
            spinner: "circles"
        });

        loading.present();

        this.subMenuMeta = this.navParams.get("menuItem");

        this.wpService.getMenuMapObject().subscribe(menuMap => {

            let navItemName = this.navParams.get('menuItem').Name
            let navItemFormatted = navItemName.replace(/[^A-Z0-9]+/ig, "-").toLowerCase();

            this.menuMap = menuMap;

            if (this.subMenuMeta['SubMenuId'] === 7) {
                this.menuSlug = 'smoothies-and-smoothie-bowls'
            } else {
                this.menuSlug = navItemFormatted;
            }

            this.wpSubMenuItems = _.filter(this.menuMap, {'submenu' : this.menuSlug})
        })

        this.subMenuObserver = this.menu.getSubmenu( this.subMenuMeta['SubMenuId'] ).subscribe( data => {

            this.subMenu = data;

            loading.dismiss();

        });
    }

    /**
     * Super Tabs loads the next tab before the transition
     */
    ionViewDidLoad() {

    }

    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public addItem( item ) {

        this.app.getRootNavs()[0].push( 'MenuItemPage', { menuItem: item }, { animate: true } );
    }

    // private arrangeMenuData( data ) {

    //     let defaults     = [];
    //     // let menuItem     = data.item;
    //     let salesItems   = data.salesItems[0];

    //     if ( salesItems.ModGroups.length > 0 &&  salesItems.DefaultOptions.length > 0 ) {

    //         defaults = salesItems.DefaultOptions;
    //         return this.registerCustomizationVariables( salesItems.ModGroups, defaults );

    //     } else {

    //         return this.registerCustomizationVariables( salesItems.ModGroups );
    //     }
    // }

    // private registerCustomizationVariables( allModifiers, defaultOptions: Array<DefaultOptions> = [] ) {

    //     let tempObj      = {};
    //     allModifiers.forEach( modifierGroup => {

    //         let modObject = {};
    //         modObject['maximumItems'] = modifierGroup.MaximumItems;
    //         modObject['minimumItems'] = modifierGroup.MinimumItems;
    //         modObject['currentlySelected'] = [];
    //         modObject['modifiers'] = {};
    //         modObject['groupDetails'] = {};
    //         modifierGroup.Mods.forEach( mod => {

    //             modObject['groupDetails'] = modifierGroup;
    //             modObject['modifiers'][mod.$id] = {};

    //             let isModDefault = defaultOptions.find( option => {
    //                 return option['ModifierId'] === mod.ModifierId;
    //             });

    //             if ( isModDefault ) {

    //                 modObject['modifiers'][mod.$id]['quantity'] = isModDefault.DefaultQuantity;
    //                 modObject['currentlySelected'].push(mod);

    //             } else {
    //                 modObject['modifiers'][mod.$id]['quantity'] = 0;
    //             }
    //         });

    //         tempObj[modifierGroup.$id] = {};
    //         tempObj[modifierGroup.$id] = modObject;

    //     });

    //     return this.customData = tempObj;

    // }

    public quickAdd( item ) {
        let message = `Add ${ item['DisplayName'] } to your bag?`
        let alert = this.alertCtrl.create({

            title   : message,
            message : `Your item will be added with the included extras.`,
            buttons : [
                        {
                            text: "No :(",
                            role: "cancel",
                            cssClass: "alert-button-reject",
                            handler: () => {
                                console.log("Cancel clicked");
                            }
                        },
                        {
                            text: "Yes!",
                            cssClass: "alert-button-accept",
                            handler: () => {

                                this.addToBag( item );
                            }
                        }
                    ]
        });
        alert.present();
    }

    private addToBag( item ) {

        let searchName = item.DisplayName.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()

        // make call to wordpress api using formatted slug to get item images
        this.wpService.getPostBySlug(searchName, 'menu_item').subscribe(item => {

            if(item.length !== 0) {

                // get cart image, will need this when saving object to bag
                this.cartImage = (item[0].acf !== undefined && item[0].acf.cart_image !== undefined) ? item[0].acf.cart_image.url : '//via.placeholder.com/160x240';

            }
        })

        this.menuItemObserver = this.menu.getMenuItem( item.MenuItemId )

            .subscribe( data => {

                // let bagItem = this.arrangeMenuData( data );
                let menuItem   = data.item;
                let salesItems = data.salesItems[0];
                let quantity   = 1;

                // add quantity and totalPrice to object
                menuItem['Quantity']   = quantity;
                menuItem['TotalPrice'] = salesItems.Price;
                menuItem['Modifiers']  = Object.values( this.customData );
                menuItem['UnitPrice']  = salesItems.Price;
                menuItem['CartImage'] = this.cartImage;
                menuItem['caloricValue'] = (item.CaloricServingUnit === null) ? 0 : parseInt(item.CaloricServingUnit, 10);;

                // Push full object to bag service
                this.bag.quickAddLineItem( menuItem );

                // Wipe out local values
                menuItem   = null;
                // quantity   = null;
                // totalPrice = null;
            });
    }
}
