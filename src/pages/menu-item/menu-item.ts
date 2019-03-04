import { Component } from '@angular/core';
import { App, IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
// import { Observable } from "rxjs/Observable";
import { DefaultOptions } from '../../models/DefaultOptions';
import { SalesItem } from '../../models/SalesItem';
import { WordPressProvider } from '../../providers/word-press/word-press';
import * as _ from 'lodash';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: "page-menu-item",
  templateUrl: "menu-item.html"
})

export class MenuItemPage {

  quantity     : number = 1;
  public customizationData : Object = {};
  loadingMenu  : boolean = true;
  menuItemId   : String;
  public menuItemDetails : any;
  private salesItemDetails : any;
  defaultPrice : any;
  totalPrice   : number;
  salesItemId  : number;
  featuredImage : string = '';
  featuredImageAlt : string = '';
  cartImage : string = '';
  formattedSlug : string = '';
  requiredModifierGroups : Array<any> = [];
  currentModifierArray : Array<any> = [];
  specialInstructions : String;
  submitAttempted : boolean = false;
  order;
  itemPrice;
  calorieCount;
  orderedSalesItemDetails
  public multipleSalesItems : Array<SalesItem> = [];
  public sizeChoice : any;

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
    console.log('hey-params', this.navParams)

    // take menu item from nav params and format replacing spaces with dashes
    let slug = this.navParams.get('menuItem').DisplayName
    this.formattedSlug = slug.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
  }

  ionViewWillLoad () {
    // make call to wordpress api using formatted slug to get item images
    this.wpService.getPostBySlug(this.formattedSlug, 'menu_item').subscribe(item => {
      // call function to manipulate returned item
      this.getItemImages(item)
    })
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

  ionViewDidLoad() {
    this.menu.getMenuItem( this.menuItemId ).subscribe( data => {
      this.arrangeMenuData( data );
    });
  }

  ionViewWillEnter() {
    document.body.classList.add("fullscreen");
  }

  ionViewWillLeave() {
    document.body.classList.remove("fullscreen");
    this.bag.editingIndex = undefined;
    this.bag.editingLineItem = null
  }
  ionViewDidLeave(){
    this.bag.editingIndex = undefined;
    this.bag.editingLineItem = null
  }

  private recalculateCost(){
    this.totalPrice = this.itemPrice * this.quantity;
  }

  switchDefault(group, modifier) {
    let oldSelection = this.customizationData[group.$id]['currentlySelected'].pop();
    this.customizationData[group.$id]['currentlySelected'].push(modifier);
    let currentSelection = this.customizationData[group.$id]['currentlySelected']
    console.log(group, modifier, oldSelection, currentSelection);
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
    // Retrieve maxSelections for Modifier Group and if any are currently selected
    let maxSelectionsForGroup = group.MaximumItems;
    let currentSelectionsArray = this.customizationData[group.$id]['currentlySelected'];

    // Check required mods array for any required modGroups
    if(this.requiredModifierGroups.length > 0){
      // Check to see if modGroup added is in the requireds
      let indexToFind = _.findIndex(this.requiredModifierGroups, {'$id' : group.$id});
      if(indexToFind > -1){
        this.requiredModifierGroups.splice(indexToFind, 1);
      }
    }

    if(currentSelectionsArray.length < maxSelectionsForGroup || maxSelectionsForGroup === 0){

      // If maxSelectionsForGroup is 0. only allow 1 of anything
      if(maxSelectionsForGroup === 0){
        let isItemAlreadySelected = _.findIndex(this.currentModifierArray, {'$id': mod.$id});

        // Only allowing 1 to be selected
        if(isItemAlreadySelected !== -1){
          return;
        }
      }

      this.customizationData[group.$id]['currentlySelected'].push(mod);
      this.customizationData[group.$id].modifiers[mod.$id]['quantity'] += 1;
      // Add to basic array for displaying near item description
      this.currentModifierArray.push(mod);

      // If modifier item has modifier values with it
      if(mod.ItemModifiers.length > 0){
        // Add to total calorie count
        this.calorieCount += (+mod.ItemModifiers[0].CaloricValue);

        // If there are FreeModifiers allowed in the modGroup &&
        //    If modGroup's currently selected items exceed the amount of free modifiers, add to price
        if(this.customizationData[group.$id]['currentlySelected'].length > group.FreeModifiers){
          // If modifier includes additional price, add to itemPrice
          this.itemPrice += mod.ItemModifiers[0].Price;
          this.recalculateCost();
        }
      }
    }
        // let maxSelections = group.MaximumItems;
        // let currentSelections = this.customizationData[group.$id]['currentlySelected'];
        // console.log( "ADDING: ", group.$id, mod );
        // if ( currentSelections.length < maxSelections ) {

        //     this.customizationData[group.$id]['currentlySelected'].push( mod );
        //     this.customizationData[group.$id].modifiers[mod.$id]['quantity']++;

        //     if ( mod.ItemModifiers.length > 0 ) {

        //         this.calorieCount += mod.ItemModifiers[0].CaloricValue;
        //         this.itemPrice += mod.ItemModifiers[0].Price;
        //         this.recalculateCost();
        //     }

        // } else {

        //     console.log( 'selection maxed' );

        // }
        // // console.log( 'hey-data', this.customizationData[group.$id].modifiers[mod.$id].quantity );
        // this.loadingMenu = false;
  }

  private removeMod( group, mod ) {
    let currentSelectionsArray = this.customizationData[group.$id]['currentlySelected'];

    // If the modGroup clicked has a minimum requirement
    if(group.MinimumItems > 0){
      // Look for group id in the required mods array
      let indexOfModGroup = _.findIndex(this.requiredModifierGroups, {'$id': group.$id});
      if(indexOfModGroup === -1){
        // Re-add index to requirements, display error
        this.requiredModifierGroups.push({'$id': group.$id});
      }
    }

    // If max selections for the current group is not reached
    if(currentSelectionsArray.length > 0){
      let indexToRemove = _.findIndex(currentSelectionsArray, {'$id' : mod.$id});
      let indexInDisplayArray = _.findIndex(this.currentModifierArray, {'$id' : mod.$id});

      let currentQuantity = this.customizationData[group.$id].modifiers[mod.$id]['quantity'];

      if(indexToRemove > -1 && currentQuantity > 0){
        let newSelectionsArray = currentSelectionsArray.splice(indexToRemove, 1);
        this.currentModifierArray.splice(indexInDisplayArray, 1);

        currentSelectionsArray = newSelectionsArray;

        this.customizationData[group.$id].modifiers[mod.$id]['quantity'] -= 1;
      }

      // Subract from calorie count if the modifier has calorie changes and it's a modifier already in the array
      if(mod.ItemModifiers.length > 0 && indexToRemove !== -1){

        this.calorieCount -= mod.ItemModifiers[0].CaloricValue;

        // If there are FreeModifiers allowed in the modGroup &&
        //    If modGroup's currently selected items exceed the amount of free modifiers, add to price
        if(this.customizationData[group.$id]['currentlySelected'].length >= group.FreeModifiers){
          // If modifier includes additional price, remove from price
          this.itemPrice -= mod.ItemModifiers[0].Price;
          this.recalculateCost();
        }
      }
    }
      // console.log("Removing: ", mod.$id);
      // function findModId( selection ) {

      //     return selection.$id === mod.$id;
      // }

      // let currentSelections = this.customizationData[group.$id]['currentlySelected'];
      // if ( this.customizationData[group.$id].modifiers[mod.$id].quantity > 0 ) {

      //     let removeIndex = currentSelections.findIndex( findModId );
      //     let currentQuantity = this.customizationData[group.$id].modifiers[mod.$id].quantity;
      //     console.log(removeIndex, currentQuantity );
      //     if( removeIndex > -1 && currentQuantity > 0){

      //         let newSelections = currentSelections.splice(removeIndex, 1);
      //         currentSelections = newSelections;
      //         this.customizationData[group.$id].modifiers[mod.$id]['quantity'] -= 1;

      //     }

      //     // Subract from calorie count if the modifier has calorie changes
      //     if (mod.ItemModifiers.length > 0) {

      //         this.calorieCount -= mod.ItemModifiers[0].CaloricValue;
      //         // If modifier includes additional price, remove from price
      //         this.itemPrice -= mod.ItemModifiers[0].Price;
      //         this.recalculateCost();

      //     }

      // }   else {

      //     console.log( 'selection is empty' );

      // }
      // console.log( this.customizationData );

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
  }

  private arrangeMenuData( data ) {

    let defaults = [];
    let defaultItemId = data.item.DefaultItemId;

    this.menuItemDetails = data;

    if(this.bag.editingLineItem){
      this.salesItemDetails = _.find(data['salesItems'], {'SalesItemId': this.bag.editingLineItem.SalesItemId});
      this.quantity = Number(this.bag.editingLineItem.Quantity)
    }
    else{
      this.salesItemDetails = _.find(data['salesItems'], {'SalesItemId': defaultItemId});
    }
    this.itemPrice = this.salesItemDetails.Price;

    this.calorieCount = (this.navParams.get('menuItem').CaloricServingUnit === null) ? 0 : parseInt(this.navParams.get('menuItem').CaloricServingUnit, 10);
    this.salesItemId = this.salesItemDetails.SalesItemId;

    // Need to account for sizes if there is more than 1 sales item
    if(data['salesItems'].length > 1){
      this.multipleSalesItems = data['salesItems'];
      this.sizeChoice = this.salesItemId;
    }

    this.recalculateCost();

    this.orderedSalesItemDetails = this.orderModifierGroups( this.salesItemDetails.ModifierGroups, this.salesItemDetails.ModGroups );
    if(this.bag.editingLineItem) {
      defaults = this.bag.editingLineItem.Modifiers;
      this.registerCustomizationVariables( this.orderedSalesItemDetails, defaults );

    } else if ( this.salesItemDetails.ModGroups.length > 0 && this.salesItemDetails.DefaultOptions.length > 0 ) {
      defaults = this.salesItemDetails.DefaultOptions;
      this.registerCustomizationVariables( this.orderedSalesItemDetails, defaults );

    } else {
      this.registerCustomizationVariables( this.orderedSalesItemDetails );
    }
  }
  public saveChanges(){
    // if the array of required mods is not empty, don't add to bag
    if(this.requiredModifierGroups.length > 0){
      this.submitAttempted = true; // triggers showing of error messages
      return; // disallow adding to bag
    }

    this.bag.removeFromBagAtIndex(this.bag.editingIndex);

    this.addToBag();

  }
  private registerCustomizationVariables( allModifiers, defaultOptions : Array<any> = [] ){
    let reqMods = new Array;

    _.forEach(allModifiers, (modifierGroup) => {
      this.customizationData[modifierGroup.$id] = new Object();

      // Create new object to store values in
      let modObject = new Object();
      modObject['maximumItems'] = (modifierGroup.MaximumItems === 0) ? 'unlimited' : modifierGroup.MaximumItems;
      modObject['minimumItems'] = modifierGroup.MinimumItems;
      modObject['currentlySelected'] = new Array;
      modObject['modifiers'] = new Object();
      modObject['groupDetails'] = new Object();
      this.customizationData[modifierGroup.$id] = modObject;

      _.forEach(modifierGroup.Mods, (modifier) => {
        this.customizationData[modifierGroup.$id]['groupDetails'] = modifierGroup;
        this.customizationData[modifierGroup.$id]['modifiers'][modifier.$id] = new Object();
        this.customizationData[modifierGroup.$id]['modifiers'][modifier.$id]['quantity'] = 0;

        let isModDefault = _.find(defaultOptions, {'ModifierId': modifier.ModifierId});

        if(isModDefault !== undefined){
          this.addMod(modifierGroup, modifier);
        }
      });

      // If the modifier group has a minimum item requirement, push to array
      if(modifierGroup.MinimumItems > 0 && this.customizationData[modifierGroup.$id]['currentlySelected'].length <= 0){
        reqMods.push({'$id' : modifierGroup.$id});
      }

    });

    this.requiredModifierGroups = reqMods;

    this.recalculateCost();
  }
  // private registerCustomizationVariables( allModifiers, defaultOptions: Array<DefaultOptions> = [] ) {
  //   // console.log( defaultOptions );
  //   let tempObj      = {};
  //   let reqMods = new Array;
  //   // let defaultArray = [];
  //   allModifiers.forEach( modifierGroup => {
  //     // console.log( modifierGroup );
  //     let modObject = {};
  //     modObject['maximumItems'] = modifierGroup.MaximumItems;
  //     modObject['minimumItems'] = modifierGroup.MinimumItems;
  //     modObject['currentlySelected'] = [];
  //     modObject['modifiers'] = {};
  //     modObject['groupDetails'] = {};
  //     // console.log( modObject );

  //     modifierGroup.Mods.forEach( mod => {
  //       // console.log( defaultOptions, mod );
  //       modObject['groupDetails'] = modifierGroup;
  //       modObject['modifiers'][mod.$id] = {};
  //       // console.log(defaultOptions);
  //       let isModDefault = defaultOptions.find( option => {
  //         // console.log( option.ModifierId, mod.ModifierId);
  //         return option['ModifierId'] === mod.ModifierId;
  //       });
  //       // console.log( isModDefault );
  //       if ( isModDefault ) {
  //         modObject['modifiers'][mod.$id]['quantity'] = isModDefault.DefaultQuantity;
  //         modObject['currentlySelected'].push(mod);
  //       } else {
  //         modObject['modifiers'][mod.$id]['quantity'] = 0;
  //       }
  //     });

  //     if(modifierGroup.MinimumItems > 0 && modObject['currentlySelected'].length <= 0){
  //       reqMods.push({'$id' : modifierGroup.$id});
  //     }

  //     tempObj[modifierGroup.$id] = {};
  //     tempObj[modifierGroup.$id] = modObject;

  //   });
  //   console.log('hello mods', tempObj)
  //   this.customizationData = tempObj;
  //   this.requiredModifierGroups = reqMods;
  //   // console.log( this.customizationData );
  // }

  public updateDataPerSize(salesId: number){
    this.salesItemDetails = _.find(this.menuItemDetails.salesItems, {'SalesItemId': +salesId});
    this.calorieCount = +this.salesItemDetails.CaloricValue;
    this.itemPrice = this.salesItemDetails.Price;

    // Initialize defaults
    let defaults = [];
    this.currentModifierArray = [];
    if(this.salesItemDetails.ModGroups.length > 0){
      // Does the sales item have defaults?
      if(this.salesItemDetails.DefaultOptions.length > 0){
        defaults = this.salesItemDetails.DefaultOptions;
      }

      this.orderedSalesItemDetails = this.orderModifierGroups( this.salesItemDetails.ModifierGroups, this.salesItemDetails.ModGroups );
      this.registerCustomizationVariables( this.salesItemDetails.ModGroups, defaults );
    }

    // Calculate initial cost based on initial quantity of 1
    this.recalculateCost();
  }

  defaultItem( group, mod ) {
    // console.log( group, mod );
    let groupId = group.$id;
    let selectedItems = this.customizationData[groupId].currentlySelected;
    let itemSelected = selectedItems.find( item => item.ModifierId === mod.ModifierId );

    // console.log( this.customizationData[groupId].currentlySelected);
    return typeof itemSelected !== 'undefined' ? true : false;
  }

  public modDisabled( group, mod ){
    let groupId = group.$id;
    // let modId = mod.$id;
    let selectedItems = this.customizationData[groupId].currentlySelected;
    let itemsLength = selectedItems.length;
    let maxItems = this.customizationData[groupId]['maximumItems'];
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

  public updateSpecialInstructions(e) {
    console.log(e.value);
    this.specialInstructions = e.value;
  }

  public addToBag() {
    if (this.requiredModifierGroups.length > 0) {
      this.submitAttempted = true; // triggers showing of error messages
      return; // disallow adding to bag
    }

    // Adding to bag needs to have all details of modifications
    //  Start simple. Add just the item itself
    let menuItem = {};
    menuItem = this.menuItemDetails.item;

    // add quantity and totalPrice to object
    let quantity = this.quantity;
    let totalPrice = this.totalPrice;
    menuItem['Quantity'] = quantity;
    menuItem['TotalPrice'] = totalPrice;
    menuItem['Modifiers'] = Object.values(this.customizationData);
    menuItem['UnitPrice'] = this.salesItemDetails.Price;
    menuItem['caloricValue'] = this.calorieCount;
    menuItem['SalesItemId'] = this.salesItemId;
    menuItem['SpecialInstructions'] = this.specialInstructions;
    menuItem['CartImage'] = this.cartImage;

    let message = `${ menuItem['DisplayName'] } has been added to your bag.`
    // Push full object to bag service
    this.bag.createLineItem(menuItem);

    // find current nav index
    let currentIndex = this.navCtrl.getActive().index;

    let alert = this.alertCtrl.create({
      title: message,
      message: 'Would you like to continue adding items or checkout?',
      buttons: [{
          text: "Go back",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Checkout",
          handler: () => {
            console.log("Go to bag");
            this.navCtrl.push("BagPage").then(() => {
              this.navCtrl.remove(currentIndex);
            });
          }
        }
      ]
    });
    if (this.bag.editingLineItem) {
        this.navCtrl.push("BagPage").then(() => {
        this.navCtrl.remove(currentIndex);
      });
      // this.app.getRootNavs()[0].push('BagPage')
    } else {
      alert.present();
    }
    // Wipe out local values
    menuItem = null;
    quantity = null;
    totalPrice = null;
  }

  public isGroupRequired(groupId): boolean{
    let isRequired = _.find(this.requiredModifierGroups, {'$id': groupId});
    return (isRequired !== undefined) ? true : false;
  }

  private orderModifierGroups(orderGroup, detailGroup){
    // Sort the modifier groups
    let sortedCollection = _.sortBy(detailGroup, (item) => {
      return orderGroup.indexOf(item.ModifierGroupId)
    });

    // Sort modifiers in groups
    _.forEach(detailGroup, modGroup => {
      let modOrder = _.values(modGroup.Modifiers);

      let sortedGroup = _.sortBy(modGroup.Mods, (item) => {
        return modOrder.indexOf(item.ModifierId);
      })

      modGroup.Mods = sortedGroup;
    });

    return sortedCollection;
  }
  get editingIndex(): number{
    return this.bag.editingIndex;
  }
}
