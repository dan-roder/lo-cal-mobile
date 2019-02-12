import { Component } from "@angular/core";
import { App, Platform, IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
// import { SuperTabsController } from "ionic2-super-tabs";
import { MenuProvider } from "../../providers/menu/menu";
import { BagProvider } from '../../providers/bag/bag';
import { CustomerProvider } from '../../providers/customer/customer';
import { LineItem } from '../../models/LineItem';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
// import { InRegistration } from "../../models/customer";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsComponent {

  public subMenus         : Observable<any>;
  public itemsInBag       : Array<LineItem> = [];
  public menuObserver     : Subscription;
  public bagObserver      : Subscription;
  public customerObserver : Subscription;
  public currentCustomer;
  public tab0Root         : String = "MenuComponent";
  public tab4Root         : String = "BurgersPage";

  constructor(
    public  platform  : Platform,
    public  navCtrl   : NavController,
    public  navParams : NavParams,
    public  storage   : Storage,
    private menu      : MenuProvider,
    private bag       : BagProvider,
    private customer  : CustomerProvider,
    private app       : App
  ) {
    this.platform.ready().then( () => {
      this.menuObserver = this.menu.getSubmenus().subscribe( data => {
        this.subMenus = data;
      });

      this.customerObserver = this.customer.customerId.subscribe( ( customer ) => {
        console.log( customer );
        if ( customer ) {
          this.currentCustomer = customer;
        } else {
          console.log( "NO CUSTOMER" );
          this.currentCustomer = null;
        }
      });
    });
  }

  ngOnInit() {
    this.storage.get('bag').then(bagItemsFromLocalStorage => {
      if (bagItemsFromLocalStorage) {
        this.itemsInBag = bagItemsFromLocalStorage;
      }
    })
    .catch(error => {
      console.log( error );
    });
  }

  ionViewWillEnter() {
    // prevents view my bag from showing when items are removed and user navigates back to menu
    this.itemsInBag = this.bag.itemsInBag;
  }

  ionViewDidLoad() {
    this.storage.get("intro-done").then( done => {
      if (!done) {
        this.storage.set("intro-done", true);
        this.navCtrl.setRoot("IntroComponent");
      }
    })
    .catch( error => console.log( error ) );

    this.customerObserver = this.customer.customerId.subscribe( ( customer ) => {
        console.log( customer );
        if ( customer ) {
          this.currentCustomer = customer;
        } else {
          console.log( "NO CUSTOMER" );
          this.currentCustomer = null;
        }
    });
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

  public onTabSelect(tab: { index: number; id: string }) {
    let index = tab.index-1;
  }

  public openBag(page) {
    this.app.getRootNavs()[0].push(page);
  }

  public setParams(category) {
    let params = {
        menuCategory: category
    };
    return params;
  }
}
