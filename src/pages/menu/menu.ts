import { Component } from "@angular/core";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { SuperTabsController } from "ionic2-super-tabs";

// import { ListComponent } from '../list/list.component';
import { MenuProvider } from "../../providers/menu/menu";

@IonicPage()
@Component({
    selector: "page-menu",
    templateUrl: "menu.html",
    providers: [MenuProvider]
})
export class MenuComponent {
    activePage: any;
    categories: any;
    rootNavCtrl: NavController;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage,
        private superTabsCtrl: SuperTabsController,
        private app: App,
        private menu: MenuProvider

    ) {

        // console.log( this.navParams.get('menu') );
        this.categories = this.navParams.get('menu');
        // this.menu.get().subscribe( data => {
        //     console.log( data );
        //     this.categories = data;
        // });

        this.rootNavCtrl = navParams.get("rootNavCtrl");

        // this.categories = [
        // { title: "Bowls", items: ["Rice", "Chicken", "Pork"] },
        // { title: "Salad", items: ["Ceaser", "House", "Wedge"] },
        // {
        //     title: "Burgers",
        //     items: ["RealBurger", "FakeBurger", "FakeCheese RealBurger"]
        // },
        // { title: "Sandwiches", items: ["BLT", "Turkey", "Roast Beef"] },
        // { title: "Breakfast", items: ["eggs", "pancakes", "waffles"] },
        // { title: "Smoothies", items: ["Blueberry", "Strawberry", "Mango"] },
        // { title: "Coffe/Tea", items: ["Regular", "Dark", "Light"] },
        // { title: "Juices", items: ["Orange", "Carrot", "Pineapple"] }
        // ];
    }

    ionViewDidLoad() {}

    checkActivePage(page): boolean {
        return page === this.activePage;
    }

    pushPage(index) {
        // adjust for menu
        index = index + 1;
        // this.rootNavCtrl.push(StoryPage);
        this.superTabsCtrl.slideTo(index);
    }

    openMenuItem() {
        console.log("OPENING MENU ITEM");
        this.app.getRootNavs()[0].push("MenuItemPage");
    }
}
