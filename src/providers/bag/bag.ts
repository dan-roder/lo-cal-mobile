import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LineItem, LineItemModifier } from '../../models/LineItem';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';



@Injectable()
export class BagProvider {

    public lineItems: Array<LineItem> = [];
    public _itemsInBag: Array<LineItem> = [];
    public _itemCountInBag: number = 0;
    private bagObserver = new Subject();
    bagItems = this.bagObserver.asObservable();

    constructor(
        public platform: Platform,
        public http: Http,
        private storage: Storage
    ) {

        console.log('Hello BagProvider Provider');

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

        console.log(passedMenuItem);
        let lineItem: LineItem = {};

        lineItem.SalesItemId = passedMenuItem.DefaultItemId; // Not sure if this should come from the SalesItem object instead of the DefaultItemId
        lineItem.MenuItemId = passedMenuItem.MenuItemId;
        lineItem.Name = passedMenuItem.Name;
        lineItem.ShortDescription = passedMenuItem.Description;
        lineItem.SpecialInstructions = passedMenuItem.SpecialInstructions;
        lineItem.UnitPrice = passedMenuItem.UnitPrice;
        lineItem.Quantity = passedMenuItem.Quantity;
        lineItem.ExtendedPrice = lineItem.UnitPrice * lineItem.Quantity;

        this.constructLineItemModifiers(passedMenuItem.Modifiers);

        // Push menuItem and lineItem into arrays
        this.itemsInBag.push(lineItem);

        // Save to localStorage
        this.saveToLocalStorage();

        lineItem = null;
    }

    private constructLineItemModifiers(allModifiers): Array<LineItemModifier> {
        let formattedLineItemModifierArray: Array<LineItemModifier> = [];

        allModifiers.forEach((modGroup, key) => {
            let modifierGroupId = modGroup.groupDetails.ModifierGroupId;

            if (modGroup.currentlySelected.length > 0) {
                modGroup.currentlySelected.forEach((modifier, key) => {
                    let lineItemModifierObject: LineItemModifier = {
                        ItemOptionGroupId: modifierGroupId,
                        SalesItemOptionId: modifier.ModifierId
                    };
                    formattedLineItemModifierArray.push(lineItemModifierObject);
                });
            }
        });

        console.log('returned modifier array', formattedLineItemModifierArray)
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
        // console.log('service bag items getter', JSON.stringify(this._itemsInBag));
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

}
