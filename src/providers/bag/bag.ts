import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LineItem, LineItemModifier } from '../../models/LineItem';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';


@Injectable()
export class BagProvider {

  public lineItems: Array<LineItem> = [];
  public _itemsInBag: Array<LineItem> = [];
  public _itemCountInBag: number = 0;
  private bagObserver = new Subject();
  bagItems = this.bagObserver.asObservable();
  private _totalPrice : number;
  public _editingItem : LineItem;
  public _editingIndex : number;

  constructor(
    public platform: Platform,
    public http: Http,
    private storage: Storage
  ) {
    this.storage.get('bag').then(bagItemsFromLocalStorage => {
      if (bagItemsFromLocalStorage) {
        this.itemsInBag = bagItemsFromLocalStorage;
        this.bagObserver.next( this.itemsInBag );
      }
    })
    .catch(error => {
      console.log( error );
    });
  }

  public createLineItem(passedMenuItem) {
    // construct object to save in bag
    let lineItem: LineItem = {};
    let priceOfMods = (passedMenuItem.TotalPrice / passedMenuItem.Quantity) - passedMenuItem.UnitPrice
    lineItem.SalesItemId = passedMenuItem.SalesItemId; // Not sure if this should come from the SalesItem object instead of the DefaultItemId
    lineItem.MenuItemId = passedMenuItem.MenuItemId;
    lineItem.Name = passedMenuItem.Name;
    lineItem.ShortDescription = passedMenuItem.Description;
    lineItem.SpecialInstructions = passedMenuItem.SpecialInstructions;
    lineItem.UnitPrice = passedMenuItem.UnitPrice;
    lineItem.Quantity = passedMenuItem.Quantity;
    lineItem.ExtendedPrice = passedMenuItem.UnitPrice + priceOfMods;
    lineItem.caloricValue = passedMenuItem.caloricValue;
    lineItem.Modifiers = this.constructLineItemModifiers(passedMenuItem.Modifiers);
    lineItem.CartImage = passedMenuItem.CartImage;
    lineItem.DisplayName = passedMenuItem.DisplayName;
    lineItem.CaloricServingUnit = passedMenuItem.CaloricServingUnit

    // Push menuItem and lineItem into arrays
    this.itemsInBag.push(lineItem);

    // Save to localStorage
    this.saveToLocalStorage();

    lineItem = null;
  }

  public quickAddLineItem( passedMenuItem ){
    // construct object to save in bag
    let lineItem: LineItem = {};

    lineItem.SalesItemId = passedMenuItem.DefaultItemId;
    lineItem.MenuItemId = passedMenuItem.MenuItemId;
    lineItem.Name = passedMenuItem.Name;
    lineItem.ShortDescription = passedMenuItem.Description;
    lineItem.UnitPrice = passedMenuItem.UnitPrice;
    lineItem.Quantity = 1;
    lineItem.ExtendedPrice = passedMenuItem.UnitPrice;
    lineItem.CartImage = passedMenuItem.CartImage;
    lineItem.DisplayName = passedMenuItem.DisplayName;
    lineItem.caloricValue = passedMenuItem.caloricValue;
    lineItem.CaloricServingUnit = passedMenuItem.CaloricServingUnit

    // add to items in bag
    this.itemsInBag.push(lineItem);

    // Save to localStorage
    this.saveToLocalStorage();

    // reset line item
    lineItem = null;
  }

  private constructLineItemModifiers(allModifiers): Array<LineItemModifier> {
    let formattedLineItemModifierArray: Array<LineItemModifier> = [];

    allModifiers.forEach((modGroup, key) => {
      let modifierGroupId = modGroup.groupDetails.ModifierGroupId;

      if (modGroup.currentlySelected.length > 0) {
        modGroup.currentlySelected.forEach((modifier, key) => {
          // Set initial quantity for the modifier being added
          let modifierQuantity : number = 1;

          // If the modifier ID we're iterating over exists
          let modExists = _.findIndex(formattedLineItemModifierArray, {SalesItemOptionId: modifier.ModifierId});

          // If it does, increase the quantity of that modifier
          if(modExists !== -1){
            formattedLineItemModifierArray[modExists].Quantity++;
          }
          // Else, construct the object and insert it
          else{
            let lineItemModifierObject : LineItemModifier = {
              Name : modifier.Name,
              ItemOptionGroupId : modifierGroupId,
              SalesItemOptionId : modifier.ModifierId,
              Quantity : modifierQuantity,
              ModifierId : modifier.ModifierId
            };

            formattedLineItemModifierArray.push(lineItemModifierObject);
          }
        });
      }
    });
    return formattedLineItemModifierArray;
  }

  public removeFromBagAtIndex(index) {
    // Remove item from both arrays
    this._itemsInBag.splice(index, 1);

    // Bag was modified, overwrite localStorage object with saved object
    this.saveToLocalStorage();
  }

  get itemCountInBag(): number {
    return this._itemsInBag.length;
  }

  get itemsInBag() {
    return this._itemsInBag;
  }

  set itemsInBag(items: Array<LineItem>) {
    this._itemsInBag = items;
  }

  protected saveToLocalStorage() {
    this.storage.set('bag', this.itemsInBag).then(() => {
      this.bagObserver.next( this.itemsInBag );
    })
    .catch(error => {
      console.log(error);
    });
  }
  public updatePrice(){
    let value = 0;
    let arr = this._itemsInBag;

    _.forEach(this._itemsInBag, function(item, key){
      value += (item.ExtendedPrice * item.Quantity);
    });

    this.totalPrice = value;
  }

  get totalPrice(): number{
    return this._totalPrice;
  }

  set totalPrice(price: number){
    this._totalPrice = price;
  }

  get editingLineItem(): LineItem{
    return this._editingItem;
  }

  set editingLineItem(item: LineItem){
    this._editingItem = item;
  }

  get editingIndex(): number{
    return this._editingIndex;
  }

  set editingIndex(num: number){
    this._editingIndex = num;
  }

}
