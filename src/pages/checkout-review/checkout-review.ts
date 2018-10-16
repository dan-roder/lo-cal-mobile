import { Component } from '@angular/core';

import {
    NavController,
    NavParams,
    IonicPage,
    LoadingController,
    AlertController
} from 'ionic-angular';

import {
    FormBuilder,
    Validators,
    FormGroup
} from '@angular/forms';


import { LineItem } from "../../models/LineItem";
import { Order } from '../../models/order';

import { Storage } from "@ionic/storage";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { BagProvider } from "../../providers/bag/bag";
import { CustomerProvider } from "../../providers/customer/customer";
import { WordPressProvider } from './../../providers/word-press/word-press';
import { OrderService } from './../../providers/order/order-provider';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-checkout-review',
  templateUrl: 'checkout-review.html',
})

export class CheckoutReviewPage {

    public itemsInBag: Array<LineItem>;
    public isOpen: number = -1;
    public allOrderDetails : Order;
    public timeForm : FormGroup;
    public timeSelectBox : string;
    public selectedTime : any;
    public times : any;
    public processing : boolean = false;
    public errorData : any = {};
    public addressData : any;
    public bagTotalPrice : number;
    public submitAttempted : boolean = false;

  constructor(

      public navCtrl: NavController,
      public navParams: NavParams,
      private bag: BagProvider,
      private customer: CustomerProvider,
      private storage: Storage,
      private alertCtrl: AlertController,
      private loadingController: LoadingController,
      private wpService: WordPressProvider,
      private fb: FormBuilder,
      private orderService: OrderService

  ) {
    this.timeForm = fb.group({
        'pickup-time' : ['', Validators.required]
      })
    // let loader = this.loadingController.create({ content: "Loading" });

    // loader.present()


    // loader.dismiss();
  }
  ngOnInit() {
      this.retrievePickupTimes();
      this.itemsInBag = this.bag.itemsInBag
      console.log(this.itemsInBag)

      // Get address data from post
      if (!this.wpService.addressContent) {
          this.wpService.getAddressContent().subscribe(addressData => {
              this.addressData = addressData;
              this.wpService.addressContent = addressData;
          })
      } else {
          this.addressData = this.wpService.addressContent;
      }
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad CheckoutReviewPage');
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }
  removeItem(item, index) {
    console.log("Item Removed");
    let alert = this.alertCtrl.create({
        title: "Confirm",
        message: "Are you sure you want to remove this item from your bag?",
        buttons: [
            {
                text: "No.",
                role: "cancel",
                cssClass: "button-cancel",
                handler: () => {
                    console.log("Cancel clicked");
                }
            },
            {
                text: "Yes.",
                cssClass: "button-accept",
                handler: () => {
                    console.log("Removed clicked");
                    this.bag.removeFromBagAtIndex(index);
                }
            }
        ]
    });
    alert.present();
  }
  public putOrder(){
    // Ensure time was selected
    if(!this.selectedTime){
      this.submitAttempted = true;
      return;
    }

    // this.processing = true;


    // this.orderService.putOrder(this.bagItems).subscribe(response => {

    //   if(response.ResultCode === 0 || response.ResultCode === 4){
    //     // Save to LocalStorage and route to checkout
    //     this.orderService.saveOrderToLocalStorage(response).subscribe(result => {
    //       if(result){
    //         this.router.navigate(['/checkout/payment']);
    //       }
    //     });
    //   }
    //   else{
    //     this.processing = false;
    //     this.errorData.error = "We're sorry. There was an error placing your order. Please try again."
    //     this.wpService.logError('Put Order Error: ' + JSON.stringify(response)).subscribe(() => {});
    //   }
    // }, error => {
    //   this.processing = false;
    //   this.errorData.error = "We're sorry. There was an error placing your order. Please try again."
    //   this.wpService.logError('Put Order Error: ' + JSON.stringify(error)).subscribe(() => {});
    // });
  }
  private retrievePickupTimes(){
    this.orderService.retrieveTimes('1').subscribe(times => {
      // 0 position in array indicates current day
      console.log('times', times)
      this.times = JSON.parse(times._body)[0].Value;
      console.log('this.time', this.times)
    })
  }

  private getNextAvailableTime(){
    this.orderService.getNextAvailableTime().subscribe(nextTime => {
      console.log('next time', nextTime)
        this.selectedTime = nextTime;
    })
  }

  public timeSelectChanged(){
      console.log(this.timeSelectBox)
    switch(this.timeSelectBox){
      case 'next':
        this.getNextAvailableTime();
      break;
      default:
        this.orderService.promiseDateTime = this.timeSelectBox;
        this.selectedTime = this.timeSelectBox;
      break;
    }
  }

}
