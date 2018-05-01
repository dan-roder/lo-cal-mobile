import { Component } from "@angular/core";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { SuperTabsController } from "ionic2-super-tabs";

// import { ListComponent } from '../list/list.component';
// import { MenuProvider } from "../../providers/menu/menu";

@IonicPage()
@Component({
    selector: "page-menu",
    templateUrl: "menu.html",
    // providers: [MenuProvider]
})
export class MenuComponent {
    activePage: any;
    categories: any;
    rootNavCtrl: NavController;

    constructor(
        public  navCtrl       : NavController,
        public  navParams     : NavParams,
        public  storage       : Storage,
        private superTabsCtrl : SuperTabsController,
        private app           : App,
        // private menu          : MenuProvider

    ) {}

    ngOnInit() {

        // console.log( this.navParams);
        this.categories = this.navParams.get('menu');
        // this.rootNavCtrl = this.navParams.get("rootNavCtrl");

    }

    ionViewDidLoad() {

    }

    checkActivePage(page): boolean {
        return page === this.activePage;
    }

    pushPage(index) {
        // adjust for menu
        index = index + 1;
        this.superTabsCtrl.slideTo(index);
    }

    openMenuItem() {
        console.log("OPENING MENU ITEM");
        this.app.getRootNavs()[0].push("MenuItemPage");
    }
}
