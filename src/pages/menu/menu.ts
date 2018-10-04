import { Component } from "@angular/core";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { SuperTabsController } from "ionic2-super-tabs";
import { WordPressProvider } from '../../providers/word-press/word-press';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

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
    menu_images;

    constructor(
        public  navCtrl       : NavController,
        public  navParams     : NavParams,
        public  storage       : Storage,
        private superTabsCtrl : SuperTabsController,
        private app           : App,
        private wp            : WordPressProvider

    ) {}

    ngOnInit() {
        this.categories = this.navParams.get('menu');
        console.log(this.categories);
        this.wp.retrieveMenuImages().subscribe( res => {
            console.log( res );
            this.menu_images = res;
        });
    }

    ionViewDidLoad() {

    }
    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }
    retrieveMenuImages(submenuId) {
        const imageUrl = this.menu_images.find( image => {
            return parseInt(image.acf.submenuid) === parseInt(submenuId);
        });
        // console.log( imageUrl.acf.category_image.url );
        return imageUrl.acf.category_image.url;
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
