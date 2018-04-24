import { Component } from "@angular/core";
import { App, Platform, IonicPage, NavController, NavParams, ItemOptions } from "ionic-angular";
import { Storage } from "@ionic/storage";
// import { SuperTabsController } from "ionic2-super-tabs";
import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
import { LineItem, LineItemModifier } from '../../models/LineItem';
import { Observable } from 'rxjs/Observable';

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
    itemsInBag: Array<LineItem> = [];
    menuObserver;
    bagObserver;

    constructor(
        public  platform  : Platform,
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        public  storage   : Storage,
        private menu      : MenuProvider,
        private bag       : BagProvider,
        private app       : App
    ) {
        this.platform.ready().then( () => {

            console.log( "Platform ready ... " );
            this.menuObserver = this.menu.getSubmenus().subscribe( data => {

                console.log(data );
                this.subMenus = data;

            });

            this.bagObserver = this.bag.bagItems.subscribe( ( items: Array<LineItem> ) => {

                if( items ) {

                    this.itemsInBag = items;
                    console.log( this.itemsInBag );

                }

            });



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

    ionViewWillLeave() {

        this.bagObserver.unsubscribe();
        this.menuObserver.unsubscribe();

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
