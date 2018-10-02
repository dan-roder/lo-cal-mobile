import { Component } from '@angular/core';
import { App, IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
// import { Observable } from "rxjs/Observable";
import { DefaultOptions } from '../../models/DefaultOptions';
import { WordPressProvider } from '../../providers/word-press/word-press';


@IonicPage()
@Component({

    selector: "page-menu-item",
    templateUrl: "menu-item.html"

})
export class MenuItemPage {

    quantity     : number = 1;
    customData   : Object = {};
    loadingMenu  : boolean = true;
    menuItemId   : String;
    menuItem     : any;
    salesItems   : any;
    defaultPrice : any;
    totalPrice   : number;
    salesItemId  : number;
    featuredImage : string = '';
    featuredImageAlt : string = '';
    cartImage : string = '';
    formattedSlug : string = '';
    specialInstructions : String;
    order;
    itemPrice;
    calorieCount;



    constructor(

        public  app       : App,
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private alertCtrl : AlertController,
        private menu      : MenuProvider,
        private bag       : BagProvider,
        private wpService : WordPressProvider

    ) {

        this.menuItemId   = this.navParams.get('menuItem').MenuItemId;
        this.defaultPrice = this.navParams.get('menuItem').defaultPrice;

        // take menu item from nav params and format replacing spaces with dashes
        let slug = this.navParams.get('menuItem').DisplayName
        this.formattedSlug = slug.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()

        // console.log('hey-params', this.navParams)

    }
    ionViewWillLoad () {
        // make call to wordpress api using formatted slug to get item images
        this.wpService.getPostBySlug(this.formattedSlug, 'menu_item').subscribe(item => {

            // call function to manipulate returned item
            this.getItemImages(item)

        })
    }
    ionViewDidLoad() {

        // console.log("ionViewDidLoad MenuItemPage");
        // console.log( this.menuItemId );
        this.menu.getMenuItem( this.menuItemId )
            .subscribe( data => {

                console.log( 'hey data', data );
                this.arrangeMenuData( data );

            });

    }

    ionViewWillEnter() {

        document.body.classList.add("fullscreen");

    }

    ionViewWillLeave() {

        document.body.classList.remove("fullscreen");

    }

    private recalculateCost(){

        this.totalPrice = this.itemPrice * this.quantity;

    }

    public buildModifiers( group, modifier, e ) {
        // console.log(group, modifier, e.value);
        if( e.value ){

            this.addMod( group, modifier );

        } else {

            this.removeMod( group, modifier );

        }
    }

    private addMod( group, mod ) {

        let maxSelections = group.MaximumItems;
        let currentSelections = this.customData[group.$id]['currentlySelected'];
        console.log( "ADDING: ", group.$id, mod );
        if ( currentSelections.length < maxSelections ) {

            this.customData[group.$id]['currentlySelected'].push( mod );
            this.customData[group.$id].modifiers[mod.$id]['quantity']++;

            if ( mod.ItemModifiers.length > 0 ) {

                this.calorieCount += mod.ItemModifiers[0].CaloricValue;
                this.itemPrice += mod.ItemModifiers[0].Price;
                this.recalculateCost();
            }

        } else {

            console.log( 'selection maxed' );

        }
        // console.log( 'hey-data', this.customData[group.$id].modifiers[mod.$id].quantity );
        this.loadingMenu = false;

    }

    private removeMod( group, mod ) {

        console.log("Removing: ", mod.$id);
        function findModId( selection ) {

            return selection.$id === mod.$id;
        }

        let currentSelections = this.customData[group.$id]['currentlySelected'];
        if ( this.customData[group.$id].modifiers[mod.$id].quantity > 0 ) {

            let removeIndex = currentSelections.findIndex( findModId );
            let currentQuantity = this.customData[group.$id].modifiers[mod.$id].quantity;
            console.log(removeIndex, currentQuantity );
            if( removeIndex > -1 && currentQuantity > 0){

                let newSelections = currentSelections.splice(removeIndex, 1);
                currentSelections = newSelections;
                this.customData[group.$id].modifiers[mod.$id]['quantity'] -= 1;

            }

            // Subract from calorie count if the modifier has calorie changes
            if (mod.ItemModifiers.length > 0) {

                this.calorieCount -= mod.ItemModifiers[0].CaloricValue;
                // If modifier includes additional price, remove from price
                this.itemPrice -= mod.ItemModifiers[0].Price;
                this.recalculateCost();

            }

        }   else {

            console.log( 'selection is empty' );

        }
        console.log( this.customData );

    }
    private getItemImages ( item ) {
        // handle if no item is returned from wordpress
        if(item.length !== 0) {

            // set featured image
            this.featuredImage = (item[0].featured_media !== 0) ? item[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : '//via.placeholder.com/1440x500';

            // also pull cart image, will need this when saving object to bag
            this.cartImage = (item[0].acf !== undefined && item[0].acf.cart_image !== undefined) ? item[0].acf.cart_image.url : '//via.placeholder.com/160x240';
            // this.featuredImageAlt = (item[0].featured_media !== 0) ? item[0]._embedded['wp:featuredmedia'][0].alt_text : '';

        }
            console.log('cart image', this.cartImage)
    }
    private arrangeMenuData( data ) {

        let defaults          = [];
        this.menuItem         = data.item;
        this.salesItems       = data.salesItems[0];
        this.itemPrice        = data.salesItems[0].Price;
        this.calorieCount     = (this.navParams.get('menuItem').CaloricServingUnit === null) ? 0 : parseInt(this.navParams.get('menuItem').CaloricServingUnit, 10);
        this.salesItemId      = data.salesItems[0].SalesItemId;
        this.recalculateCost();
        // console.log(data, this.menuItem, data.salesItems, this.itemPrice, this.calorieCount );

        if ( this.salesItems.ModGroups.length > 0 &&  this.salesItems.DefaultOptions.length > 0 ) {

            // console.log(this.salesItems.ModGroups.length);
            defaults = this.salesItems.DefaultOptions;
            this.registerCustomizationVariables( this.salesItems.ModGroups, defaults );

        } else {

            // console.log("No Default Options", this.salesItems.ModGroups.length);
            this.registerCustomizationVariables( this.salesItems.ModGroups );

        }

    }

    private registerCustomizationVariables( allModifiers, defaultOptions: Array<DefaultOptions> = [] ) {

        // console.log( defaultOptions );
        let tempObj      = {};
        // let defaultArray = [];
        allModifiers.forEach( modifierGroup => {
            console.log( modifierGroup );
            let modObject = {};
            modObject['maximumItems'] = modifierGroup.MaximumItems;
            modObject['minimumItems'] = modifierGroup.MinimumItems;
            modObject['currentlySelected'] = [];
            modObject['modifiers'] = {};
            modObject['groupDetails'] = {};
            // console.log( modObject );
            modifierGroup.Mods.forEach( mod => {

                // console.log( defaultOptions, mod );
                modObject['groupDetails'] = modifierGroup;
                modObject['modifiers'][mod.$id] = {};
                // console.log(defaultOptions);
                let isModDefault = defaultOptions.find( option => {
                    console.log( option.ModifierId, mod.ModifierId);
                    return option['ModifierId'] === mod.ModifierId;

                });
                // console.log( isModDefault );
                if ( isModDefault ) {

                    modObject['modifiers'][mod.$id]['quantity'] = isModDefault.DefaultQuantity;
                    modObject['currentlySelected'].push(mod);

                } else {

                    modObject['modifiers'][mod.$id]['quantity'] = 0;

                }

            });

            tempObj[modifierGroup.$id] = {};
            tempObj[modifierGroup.$id] = modObject;

        });

        this.customData = tempObj;
        console.log( this.customData );
    }

    defaultItem( group, mod ) {
        // console.log( group, mod );
        let groupId = group.$id;
        let modId = mod.$id;
        let selectedItems = this.customData[groupId].currentlySelected;
        let itemSelected = selectedItems.find( item => item.ModifierId === mod.ModifierId );

        // console.log( this.customData[groupId].currentlySelected);
        return typeof itemSelected !== 'undefined' ? true : false;
    }

    modDisabled( group, mod ){

        let groupId = group.$id;
        // let modId = mod.$id;
        let selectedItems = this.customData[groupId].currentlySelected;
        let itemsLength = selectedItems.length;
        let maxItems = this.customData[groupId]['maximumItems'];
        let currentItem = selectedItems.find( item => item.ModifierId === mod.ModifierId );
        if (itemsLength >= maxItems && typeof currentItem === 'undefined') {

            return true;

        } else {

            return false;

        }

    }

    public incrementQuantity() {
        this.quantity++;
        this.recalculateCost();
    }

    public decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
            this.recalculateCost();
        }
    }

    addToBag() {

        console.log( this.customData );
        // Adding to bag needs to have all details of modifications
        //  Start simple. Add just the item itself
        let menuItem = {};
            menuItem = this.menuItem;

        // add quantity and totalPrice to object
        let      quantity      = this.quantity;
        let      totalPrice    = this.totalPrice;
        menuItem['Quantity']   = quantity;
        menuItem['TotalPrice'] = totalPrice;
        menuItem['Modifiers']  = Object.values( this.customData );
        menuItem['UnitPrice']  = this.salesItems.Price;
        menuItem['caloricValue'] = this.calorieCount;
        menuItem['SalesItemId'] = this.salesItemId;
        menuItem['SpecialInstructions'] = this.specialInstructions;
        menuItem['CartImage'] = this.cartImage
        console.log( 'hey menu-item', this.menuItem );

        let message = `${ menuItem['DisplayName'] } has been added to you your bag.`
        // Push full object to bag service
        this.bag.createLineItem( menuItem );
        let alert = this.alertCtrl.create({
            title: message,
            message: 'Would you like to continue adding items or checkout?',
            buttons: [
                {
                    text: "Go back?",
                    role: "cancel",
                    handler: () => {

                        console.log("Cancel clicked");

                    }
                },
                {
                    text: "Checkout?",
                    handler: () => {

                        console.log("Go to bag");
                        this.app.getRootNavs()[0].push('BagPage');

                    }
                }
            ]
        });
        alert.present();
        // Wipe out local values
        menuItem   = null;
        quantity   = null;
        totalPrice = null;
    }

}
