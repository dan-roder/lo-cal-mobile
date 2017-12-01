import { Component } from "@angular/core";
import { App, IonicPage, NavController } from "ionic-angular";
import { Storage } from "@ionic/storage";
// import { SuperTabsController } from "ionic2-super-tabs";

@IonicPage()
@Component({
    selector: "page-tabs",
    templateUrl: "tabs.html"
})
export class TabsComponent {

    tab1Root = "MenuComponent";
    tab2Root = "Tab2Component";
    tab3Root = "MenuComponent";
    tab4Root = "Tab2Component";
    tab5Root = "MenuComponent";
    tab6Root = "Tab2Component";
    tab7Root = "MenuComponent";
    tab8Root = "Tab2Component";
    tab9Root = "MenuComponent";

    constructor(
        public navCtrl: NavController,
        public storage: Storage,
        private app: App // private superTabsCtrl: SuperTabsController
    ) {}

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
        console.log(`Selected tab: `, tab);
    }

    openBag(page) {
        this.app.getRootNavs()[0].push(page);
    }
}
