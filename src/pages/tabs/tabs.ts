import { Component } from "@angular/core";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
// import { SuperTabsController } from "ionic2-super-tabs";
import { MenuProvider } from "../../providers/menu/menu";

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


    constructor(
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        public  storage   : Storage,
        private menu      : MenuProvider,
        private app       : App
        // private superTabsCtrl: SuperTabsController
    ) {
        this.menu.getSubmenus().subscribe( data => {
            console.log( "ON INIT ", data );
            this.subMenus = data;
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
