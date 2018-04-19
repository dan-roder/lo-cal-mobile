import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MenuProvider } from "../../providers/menu/menu";
// import { PipesModule } from '../../pipes/pipes.module';

@IonicPage()
@Component({
    selector: "page-burgers",
    templateUrl: "burgers.html"
})
export class BurgersPage {
    subMenuMeta;
    subMenu;
    constructor(
        public  app       : App,
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        public  loading   : LoadingController,
        private menu      : MenuProvider
    ) { }

    ngOnInit() {

        let loading = this.loading.create({
            content: "Loading Menu ... ",
            spinner: "circles"
        });
        loading.present();
        this.subMenuMeta = this.navParams.get("menuItem");
        this.menu.getSubmenu( this.subMenuMeta.SubMenuId ).subscribe( data => {
            this.subMenu = data;
            loading.dismiss();
            console.log( this.subMenu );
        });
    }

    /**
     * Super Tabs loads the next tab before the transition
     */
    ionViewDidLoad() {

    }

    ionViewWillEnter() {
        console.log( "ionViewDidLoad BurgersPage" );
        console.log( this.navParams.get( 'menuItem' ) );
    }

    addItem( item ) {
        console.log( item );
        this.app.getRootNavs()[0].push( 'MenuItemPage', { menuItem: item }, { animate: true } );
        // this.navCtrl.push( 'MenuItemPage', { menuItem: item } );
    }
}
