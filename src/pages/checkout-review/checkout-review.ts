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
    FormGroup,
    AbstractControl
} from '@angular/forms';

import{ Customer } from "../../models/customer"
import { LineItem } from "../../models/LineItem";
import { Order } from '../../models/order';

import { Storage } from "@ionic/storage";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { BagProvider } from "../../providers/bag/bag";
import { CustomerProvider } from "../../providers/customer/customer";
import { WordPressProvider } from './../../providers/word-press/word-press';
import { OrderService } from './../../providers/order/order-provider';
import { userInfo } from 'os';

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
    public guestCheckoutForm: FormGroup;
    public timeSelectBox : string;
    public selectedTime : any;
    public times : any;
    public processing : boolean = false;
    public errorData : any = {};
    public addressData : any;
    public bagTotalPrice : number;
    public submitAttempted : boolean = false;
    public hideGuestForm   : boolean = false;
    public userLoggedIn    : boolean = false;
    public hideReEnterDetails: boolean = true;

  constructor(

      public navCtrl: NavController,
      public navParams: NavParams,
      private bag: BagProvider,
    //   private customer: CustomerProvider,
      private storage: Storage,
      private alertCtrl: AlertController,
      private loadingController: LoadingController,
      private wpService: WordPressProvider,
      private fb: FormBuilder,
      private orderService: OrderService

  ) {
    this.timeForm = fb.group({
        'pickup-time': ['', Validators.required]
    })

    this.guestCheckoutForm = fb.group({
        'guest-first-name': ['', [Validators.required, Validators.maxLength(28)]],
        'guest-last-name': ['', [Validators.required, Validators.maxLength(28)]],
        'guest-email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
    })


    if(!this.navParams.get('guest')) {
        this.hideGuestForm = true;
        this.hideReEnterDetails = true;
        console.log(this.hideGuestForm, this.hideReEnterDetails)
    }
    // let loader = this.loadingController.create({ content: "Loading" });

    // loader.present()


    // loader.dismiss();
    }

    ngOnInit() {

        // get pickup times
        this.retrievePickupTimes();

        // get address info
        this.getAddress();

        // get customer info
        this.getCustomer()

        // get bag items from local storage
        this.itemsInBag = this.bag.itemsInBag

    }
    public checkoutAsGuest(){

        let loader = this.loadingController.create({ content: "Signing In As Guest" });
        loader.present()

        if(this.guestCheckoutForm.valid){
          // Save customer as normal
          let customer: Customer = {
            FirstName : this.guestCheckoutForm.controls['guest-first-name'].value,
            LastName : this.guestCheckoutForm.controls['guest-last-name'].value,
            EMail : this.guestCheckoutForm.controls['guest-email'].value,
            IsGuest : true
          }

          // Redirect to checkout review
          this.storage.set('user', customer).then(() => {
            this.orderService.customerInfo = customer;
                this.hideGuestForm = true
                this.userLoggedIn = true;
                loader.dismiss();
          });
          this.hideReEnterDetails = false;
        }
      }
    getCustomer() {
        // get customer so order PUT doesn't fail
        this.storage.get('user').then(customerData => {
            this.orderService.customerInfo = customerData;
            this.userLoggedIn = true;
        })
    }

    getAddress() {

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
            buttons: [{
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
    reEnterDetails() {
        this.hideReEnterDetails = true;
        this.hideGuestForm = false;
    }
    public putOrder() {
        // Ensure time was selected
        if (!this.selectedTime) {
            this.submitAttempted = true;
            return;
        }

        this.processing = true;


        this.orderService.putOrder(this.itemsInBag).subscribe(response => {
            console.log('here response', response.json())
            let jsonResponse = response.json()
              if(jsonResponse.ResultCode === 0 || jsonResponse.ResultCode === 4){
                // Save to LocalStorage and route to checkout
                this.orderService.saveOrderToLocalStorage(jsonResponse).then(result => {
                  if(result){
                    // this.router.navigate(['/checkout/payment']);
                    console.log('go to payment page')
                  }
                });
                console.log('TRUEEE')
              }
              else{
                this.processing = false;
                this.errorData.error = "We're sorry. There was an error placing your order. Please try again."
                this.wpService.logError('Put Order Error: ' + JSON.stringify(response)).subscribe(() => {});
              }
        }, error => {
           this.processing = false;
           this.errorData.error = "We're sorry. There was an error placing your order. Please try again."
           this.wpService.logError('Put Order Error: ' + JSON.stringify(error)).subscribe(() => {});
        });
    }


    private retrievePickupTimes() {
        this.orderService.retrieveTimes('1').subscribe(times => {

            // 0 position in array indicates current day
            this.times = JSON.parse(times._body)[0].Value;
        })
    }

    private getNextAvailableTime() {
        this.orderService.getNextAvailableTime().subscribe(nextTime => {

            this.selectedTime = nextTime;

        })
    }

    public timeSelectChanged() {
        // console.log(this.timeSelectBox)
        switch (this.timeSelectBox) {
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
