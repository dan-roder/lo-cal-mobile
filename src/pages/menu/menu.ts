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

    public activePage: any;
    public categories: any;
    public rootNavCtrl: NavController;
    public menu_images;

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
        this.wp.retrieveMenuImages().subscribe( res => {
            this.menu_images = res.json();
        });
    }

    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public retrieveMenuImages(submenuId) {

        const imageUrl = this.menu_images.find( image => {

            return parseInt(image.acf.submenuid) === parseInt(submenuId);
        });
        return imageUrl.acf.category_image.url;
    }

    public checkActivePage(page): boolean {

        return page === this.activePage;
    }

    public pushPage(index) {
        // adjust for menu
        index = index + 1;
        this.superTabsCtrl.slideTo(index);
    }

    public openMenuItem() {
        this.app.getRootNavs()[0].push("MenuItemPage");
    }
}
