import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { BagProvider } from "../../providers/bag/bag";
import { OrderService } from './../../providers/order/order-provider';
import { Order } from '../../models/order';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Config } from '../../app/app.config';
import { WordPressProvider } from './../../providers/word-press/word-press';
import { CustomerProvider } from "../../providers/customer/customer";
import{ Customer } from "../../models/customer"

/**
 * Generated class for the ThankYouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {

  public orderResult : Order;
  public activeCardClass : string = '';
  public paidWithCardType : string = '';
  public confirmationContent : any;
  public orderItemsForDisplay : any;

  constructor(
    private localStorage: Storage,
    private bagService: BagProvider, 
    private orderService: OrderService, 
    private config: Config, 
    private wpService: WordPressProvider, 
    private customerService: CustomerProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.localStorage.remove('order').then(() => {});
    this.localStorage.remove('bag').then(() => {});
    this.localStorage.remove('vehicle').then(() => {});

    this.getCustomer();
    // Get current customer to check if they were a guest customer
   

    this.bagService.itemsInBag = [];
    this.bagService.totalPrice = 0;

    this.wpService.getPage(3660).subscribe(content => {
      this.confirmationContent = content;
    })

    this.orderService.hasOrderBeenCreated().then(result => {
      this.orderItemsForDisplay = this.orderService.calculateTotalWithModifiers(result.Order);
      this.orderResult = result;
      this.activeCardClass = this.config.cardClassMap[result.Order.Payments[0].CardType];
      this.paidWithCardType = this.config.cardTypeMap[result.Order.Payments[0].CardType];
    });
  }

  getCustomer() {
    // get customer so order PUT doesn't fail
    this.localStorage.get('user').then(customerData => {
      if(customerData.IsGuest){
        // If they were a guest customer, remove the user from localStorage
        this.localStorage.remove('user').then(() => {});
      }
    })
}

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankYouPage');
  }

}
