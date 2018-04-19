import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu/menu";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
    selector: "page-menu-item",
    templateUrl: "menu-item.html"
})
export class MenuItemPage {

    menuItemId : String;
    menuItem   : any;
    itemMods   : any;

    constructor(
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private menu      : MenuProvider
    ) {
        console.log( this.navParams.get('menuItem') );
        this.menuItemId = this.navParams.get('menuItem').MenuItemId;
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad MenuItemPage");
        console.log( this.menuItemId );
        this.menu.getMenuItem( this.menuItemId )
            .subscribe( data => {
                console.log( data );
                this.menuItem = data.item;
                this.itemMods = data.salesItems;
            })
    }

    ionViewWillEnter() {
        document.body.classList.add("fullscreen");
    }

    ionViewWillLeave() {
        document.body.classList.remove("fullscreen");
    }
}
