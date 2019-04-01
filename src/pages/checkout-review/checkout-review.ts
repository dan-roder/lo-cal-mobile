import { Component } from '@angular/core';

import { NavController, NavParams, IonicPage, LoadingController, AlertController } from 'ionic-angular';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import{ Customer } from "../../models/customer"
import { LineItem } from "../../models/LineItem";
import { Order } from '../../models/order';

import { Storage } from "@ionic/storage";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Vehicle } from "../../models/Payment";

import { BagProvider } from "../../providers/bag/bag";
import { CustomerProvider } from "../../providers/customer/customer";
import { WordPressProvider } from './../../providers/word-press/word-press';
import { OrderService } from './../../providers/order/order-provider';
import * as moment from 'moment'
import * as _ from 'lodash';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-checkout-review',
  templateUrl: 'checkout-review.html',
})
export class CheckoutReviewPage {

  public itemsInBag: Array < LineItem > ;
  public isOpen: number = -1;
  public allOrderDetails: Order;
  public timeForm: FormGroup;
  public guestCheckoutForm: FormGroup;
  public timeSelectBox: string;
  public selectedTime: any;
  public times: any;
  public processing: boolean = false;
  public errorData: any = {};
  public addressData: any;
  public bagTotalPrice: number;
  public submitAttempted: boolean = false;
  public pickupForm: FormGroup;
  public hideGuestForm: boolean = false;
  public userLoggedIn: boolean = false;
  public hideReEnterDetails: boolean = true;
  public timeElapsedError: boolean = false;

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private bag: BagProvider,
    private customerService: CustomerProvider,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private wpService: WordPressProvider,
    private fb: FormBuilder,
    private orderService: OrderService

  ) {

    this.pickupForm = this.fb.group({
      'pickup-selection': [null, Validators.required],
      'vehicle-make': [null],
      'vehicle-model': [null],
      'vehicle-color': [null]
    });

    this.timeForm = this.fb.group({
      'pickup-time': ['', Validators.required]
    })

    this.guestCheckoutForm = fb.group({
      'guest-first-name': ['', [Validators.required, Validators.maxLength(28)]],
      'guest-last-name': ['', [Validators.required, Validators.maxLength(28)]],
      'guest-phone': ['', Validators.compose([Validators.required, Validators.pattern(/(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/)])],
      'guest-email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
    })


    if (!this.navParams.get('guest')) {

      this.hideGuestForm = true;
      this.hideReEnterDetails = true;
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
    this.getCustomer();

    // get bag items from local storage
    this.itemsInBag = this.bag.itemsInBag

  }
  // public checkoutAsGuest() {
  //   this.submitAttempted = true
  //   let loader = this.loadingController.create({
  //     content: "Signing In As Guest"
  //   });
  //   loader.present()

  //   if (this.guestCheckoutForm.valid) {
  //     // Save customer as normal
  //     let customer: Customer = {
  //       FirstName: this.guestCheckoutForm.controls['guest-first-name'].value,
  //       LastName: this.guestCheckoutForm.controls['guest-last-name'].value,
  //       EMail: this.guestCheckoutForm.controls['guest-email'].value,
  //       Phone: this.guestCheckoutForm.controls['guest-phone'].value,
  //       IsGuest: true
  //     }

  //     // Redirect to checkout review
  //     this.storage.set('user', customer).then(() => {
  //       this.orderService.customerInfo = customer;
  //       this.userLoggedIn = true;
  //       loader.dismiss();
  //     });
  //   }
  // }
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
    // console.log("Item Removed");
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Are you sure you want to remove this item from your bag?",
      buttons: [{
          text: "No",
          role: "cancel",
          cssClass: "button-cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Yes",
          cssClass: "button-accept",
          handler: () => {
            this.bag.removeFromBagAtIndex(index);
          }
        }
      ]
    });
    alert.present();
  }
  backToMenu() {
    this.navCtrl.popToRoot();
  }
  public putOrder() {

    // Ensure time was selected
    if (!this.selectedTime || !this.pickupForm.valid || (!this.loggedInStatus && !this.guestCheckoutForm.valid)) {
      this.submitAttempted = true;
      return;
    }

    // Ensure when order is PUT, 30min delay has not elapsed
    if (!this.ensureEnoughTime(this.selectedTime)) {
      this.selectedTime = '';
      this.timeElapsedError = true;
      return;
    }

    this.processing = true;
    this.orderService.orderMode = this.pickupForm.get('pickup-selection').value;
    let vehicle: Vehicle = {};
    if (this.pickupForm.get('pickup-selection').value === '4') {
      vehicle = this.constructVehicleObject();
      this.storage.set('vehicle', vehicle).then(() => {});
    }


    if (!this.loggedInStatus) {
      let customer: Customer = {
        FirstName: this.guestCheckoutForm.controls['guest-first-name'].value,
        LastName: this.guestCheckoutForm.controls['guest-last-name'].value,
        EMail: this.guestCheckoutForm.controls['guest-email'].value,
        VoicePhone: this.guestCheckoutForm.controls['guest-phone'].value.replace(/[^A-Z0-9]/ig, ""),
        IsGuest: true
      }
      this.orderService.customerInfo = customer;
      this.storage.set('user', customer).then(() => {});
    }



    let loader = this.loadingController.create({
      content: "Processing Order ...",
      spinner: "circles"
    });
    loader.present()

    this.orderService.putOrder(this.bagItems).subscribe(response => {
      let jsonResponse = response.json()
      if (jsonResponse.ResultCode === 0 || jsonResponse.ResultCode === 4) {
        // Save to LocalStorage and route to checkout
        this.orderService.saveOrderToLocalStorage(jsonResponse).then(result => {
          if (result) {
            // this.router.navigate(['/checkout/payment']);
            this.navCtrl.push('CheckoutPaymentPage')
            loader.dismiss()
          }
        });

      } else {
        loader.dismiss()
        this.processing = false;
        this.errorData.error = "We're sorry. There was an error placing your order. Please try again."
        this.wpService.logError('Put Order Error: ' + JSON.stringify(response)).subscribe(() => {});
      }
    }, error => {
      loader.dismiss()
      this.processing = false;
      this.errorData.error = "We're sorry. There was an error placing your order. Please try again."
      this.wpService.logError('Put Order Error: ' + JSON.stringify(error)).subscribe(() => {});
    });
  }
  public ensureEnoughTime(time) {
    // Is selected time still later than
    let validPickupTime = moment().add(25, 'minutes').format();
    let isValid = moment(validPickupTime).isBefore(time);
    return isValid;
  }

  private retrievePickupTimes() {
    this.orderService.retrieveTimes('1').subscribe(times => {
      // 0 position in array indicates current day
      let todaysTimes = JSON.parse(times._body)[0].Value;
      // Filter out times that are shorter than 30min from current time
      this.times = _.filter(todaysTimes, (time) => {
        if (this.ensureEnoughTime(time.Time)) return time;
      });
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

  protected constructVehicleObject(): Vehicle {
    let vehicleInfo: Vehicle = {
      Make: this.pickupForm.get('vehicle-make').value,
      Model: this.pickupForm.get('vehicle-model').value,
      Color: this.pickupForm.get('vehicle-color').value
    }

    return vehicleInfo;
  }

  get totalBagPrice() {
    return this.bag.totalPrice;
  }

  get bagItems() {
    return this.bag.itemsInBag;
  }
  get loggedInStatus(): boolean {
    return this.customerService.isLoggedIn;
  }
}
