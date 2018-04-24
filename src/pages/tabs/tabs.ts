import { Component } from "@angular/core";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
// import { SuperTabsController } from "ionic2-super-tabs";
import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
import { LineItem, LineItemModifier } from '../../models/LineItem';

@IonicPage()
@Component({
    selector: "page-tabs",
    templateUrl: "tabs.html"
})
export class TabsComponent {
    categories:any;
    subMenus:any;
    tab0Root = "MenuComponent";
    tab4Root = "BurgersPage";
    public itemsInBag : Array<LineItem> = [];

    constructor(
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        public  storage   : Storage,
        private menu      : MenuProvider,
        private bag       : BagProvider,
        private app       : App
        // private superTabsCtrl: SuperTabsController
    ) {
        this.menu.getSubmenus().subscribe( data => {
            console.log( "ON INIT ", data );
            this.subMenus = data;
        });

        // TO DO: Alert users if there is a leftover bag
        this.storage.get('bag').then(bagItemsFromLocalStorage => {

            if (bagItemsFromLocalStorage) {

                this.itemsInBag = bagItemsFromLocalStorage;
                // this.bagObserver.next(this.itemsInBag);
            }

        })
        .catch(error => {

            console.log(error);

        });

    }

    ngOnInit() {}

    ionViewDidLoad() {

        this.storage.get("intro-done").then(done => {
            if (!done) {
                this.storage.set("intro-done", true);
                this.navCtrl.setRoot("IntroComponent");
            } else {
                // Nothing else
            }
        });
    }

    onTabSelect(tab: { index: number; id: string }) {
        let index = tab.index-1;
        // console.log(`Selected tab: `, tab.index, index );
        // console.log( this.subMenus[`${index}`], this.navParams);

    }

    openBag(page) {
        this.app.getRootNavs()[0].push(page);
    }

    setParams(category) {
        console.log( category );
        let params = {
            menuCategory: category
        };
        return params;
    }
}
