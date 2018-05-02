import { Component } from "@angular/core";
import { App, Platform, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
// import { SuperTabsController } from "ionic2-super-tabs";
import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
import { LineItem } from '../../models/LineItem';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

@IonicPage()
@Component({
    selector: "page-tabs",
    templateUrl: "tabs.html"
})
export class TabsComponent {

    subMenus     : Observable<any>;
    itemsInBag   : Array<LineItem> = [];
    menuObserver : Subscription;
    bagObserver  : Subscription;
    tab0Root     : String = "MenuComponent";
    tab4Root     : String = "BurgersPage";

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

    // ngOnInit() {}

    ionViewDidLoad() {

        this.storage.get("intro-done").then( done => {
            if (!done) {

                this.storage.set("intro-done", true);
                this.navCtrl.setRoot("IntroComponent");

            }
        })
        .catch( error => console.log( error ) );

    }

    ionViewWillLeave() {

        this.bagObserver.unsubscribe();
        this.menuObserver.unsubscribe();

    }

    onTabSelect(tab: { index: number; id: string }) {

        let index = tab.index-1;

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
