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
// import { CreditCardValidator, CreditCard } from 'angular-cc-library';

import { Order } from '../../models/order';
import {
    RailsSavePayment,
    InSubmitOrderInformation,
    RailsInSubmitOrder,
    SavedPayment,
    Vehicle
} from '../../models/payment';

import{ Customer } from "../../models/customer"

import { Storage } from "@ionic/storage";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { BagProvider } from "../../providers/bag/bag";
import { CustomerProvider } from "../../providers/customer/customer";
import { WordPressProvider } from './../../providers/word-press/word-press';
import { OrderService } from './../../providers/order/order-provider';

import * as _ from 'lodash';
import * as moment from 'moment';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-checkout-payment',
  templateUrl: 'checkout-payment.html',
})

export class CheckoutPaymentPage {

    public currentOrder : Order;
    public contactInfoForm : FormGroup;
    public submittedOnce : boolean = false;
    public paymentForm : FormGroup;
    public pickupForm : FormGroup;
    public sectionOpen : number = 1;
    public paymentChoice : string = '1';
    public processing : boolean = false;
    public cardType : number = undefined;
    public currentCustomer : Customer;
    public orderForDisplay : Array<any>;
    public savedPaymentMethods : SavedPayment;
    public savedPaymentChoice : string;
    public orderResultForTesting : any;
    public cardNumber: string = '';
    public pickupTimeError: boolean = false;
    public genericOrderError: boolean = false;
    public addressData: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private bagService: BagProvider,
      private orderService: OrderService,
      private fb: FormBuilder,
      private customerService: CustomerProvider,
      private wpService: WordPressProvider
  ) {

    this.pickupForm = fb.group({
        'pickup-selection' : ['', Validators.required],
        'vehicle-make' : [null],
        'vehicle-model' : [null],
        'vehicle-color' : [null]
      })

      this.contactInfoForm = fb.group({
        'first-name' : [null, Validators.required],
        'last-name' : [null, Validators.required],
        'email' : [null, Validators.compose([Validators.required, Validators.email])],
        'phone' : [null]
      });

    //   this.paymentForm = fb.group({
    //     'payment-choice' : [this.paymentChoice, Validators.required],
    //     'card-number' : [null, [Validators.required, <any>CreditCardValidator.validateCCNumber]],
    //     'expiration-date' : ['', [Validators.required, <any>CreditCardValidator.validateExpDate]],
    //     'cvv' : [null, [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    //     'save-payment' : [null]
    //   });

  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutPaymentPage');
    }
    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public editSection(num: number, $event: string) {
        this.sectionOpen = (this.sectionOpen === num) ? -1 : num;
    }

    public nextStep() {
        this.sectionOpen++;
    }
  }
