import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreditCardValidator, CreditCard } from 'angular-cc-library';
import { RailsSavePayment, InSubmitOrderInformation, RailsInSubmitOrder, SavedPayment,Vehicle } from '../../models/payment';
import { Config } from '../../app/app.config';
import{ Customer } from "../../models/customer"
import { Storage } from "@ionic/storage";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
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

    public currentOrder : any;
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
    private _vehicle : Vehicle = {};
    private orderMode : number;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private orderService: OrderService,
      private fb: FormBuilder,
      private constants: Config,
      private customerService: CustomerProvider,
      private wpService: WordPressProvider,
      private localStorage: Storage,
  ) {

    this.pickupForm = this.fb.group({
        'pickup-selection' : ['', Validators.required],
        'vehicle-make' : [null],
        'vehicle-model' : [null],
        'vehicle-color' : [null]
      })

      this.contactInfoForm = this.fb.group({
        'first-name' : [null, Validators.required],
        'last-name' : [null, Validators.required],
        'email' : [null, Validators.compose([Validators.required, Validators.email])],
        'phone' : [null]
      });

      this.paymentForm = this.fb.group({
        'payment-choice' : [this.paymentChoice, Validators.required],
        'card-number' : [null, [Validators.required, <any>CreditCardValidator.validateCCNumber]],
        'expiration-date' : ['', [Validators.required, <any>CreditCardValidator.validateExpDate]],
        'cvv' : [null, [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
        'save-payment' : [null]
      });

  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutPaymentPage');
    }

    ngOnInit() {
        // Get current customer info. Patch contact form
        this.customerService.getUserData().then(customer => {

          this.currentCustomer = customer;
          this.patchContactForm(customer);

          // If Customer has ID, look for any saved payment methods on customer's account
          if(customer.CustomerId){
            this.customerService.getSavedPayments(customer.CustomerId).subscribe(savedPayments => {
              console.log('test', JSON.parse(savedPayments._body))
              this.savedPaymentMethods = JSON.parse(savedPayments._body);
            }, error => {
              console.log(error);
            });
          }
        });

        // Get address data from post
        if(!this.wpService.addressContent){
          this.wpService.getAddressContent().subscribe(addressData => {
            this.addressData = addressData;
            this.wpService.addressContent = addressData;
          })
        }
        else{
          this.addressData = this.wpService.addressContent;
        }

        // Get Full Order Details from API
        this.orderService.getPreSavedOrder().then(order => {
          let orderId = order.OrderId;

          this.orderService.getFullOrderDetails(orderId).subscribe(fullOrder => {
            this.orderMode = fullOrder.OrderMode;
            if(fullOrder.OrderMode === 4){
              // If orderMode was set as curbside, retrieve vehicle infor
              this.localStorage.get('vehicle').then((vehicleObj) => {
                this.vehicle = vehicleObj;
              });
            }
            this.orderForDisplay = this.orderService.calculateTotalWithModifiers(fullOrder);

            this.currentOrder = fullOrder;


          })
        });
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

    public submitOrder(){
        // 1. Start spinner
        this.processing = true;
        // 2. Retrieve order
        this.orderService.getPreSavedOrder().then(order => {
          let orderId = order.OrderId;

          // Retrieve order again to ensure local storage order wasn't manipulated
          this.orderService.getFullOrderDetails(orderId).subscribe(fullOrder => {
            this.currentOrder = fullOrder;

            // 3. Construct order with all form details
            this.constructOrder(fullOrder);
          })
        });

      }

      protected constructOrder(order: any){
        let orderForApi : InSubmitOrderInformation;

        // If saved card checked
        switch(this.paymentChoice){
          case '1' :
            orderForApi = this.constructClearCreditCardPayment();
          break;
          case '2' :
            orderForApi = this.constructPayAtSitePayment();
          break;
          case '3':
            orderForApi = this.constructSecurePayment();
          break;
        }

        let finalOrderForSubmission : RailsInSubmitOrder = {
          order_submission : orderForApi
        }

        // Order object with payment has been created, submit to API
        this.orderService.submitOrder(finalOrderForSubmission, this.currentOrder.OrderId).subscribe(orderResults => {
          console.log("result code:", orderResults);
          this.orderResultForTesting = orderResults.ResultCode;


          // TODO: At the current point in time this is only reached if we get a successful API response
          if(orderResults.ResultCode == 0 || orderResults.ResultCode == 4){

            this.saveOrderAndRedirect(orderResults);
          }
          else{
            this.wpService.logError('Payment Order Error: ' + JSON.stringify(orderResults)).subscribe((result) => {console.log('error:' + result)});
            this.genericOrderError = true;
          }
        }, error => {
          this.processing = false;

          switch(+error.error.error_code){
            case 150:
              this.pickupTimeError = true;
            break;
            default:
              this.genericOrderError = true;
            break;
          }

          this.wpService.logError('Payment Order Error: ' + JSON.stringify(error)).subscribe((result) => {console.log('error:' + result)});
        });
      }

      protected constructClearCreditCardPayment(): InSubmitOrderInformation{
        let expirationDate = this.paymentForm.get('expiration-date').value;
        let finalExpDate = this.formatDate(expirationDate);

        // Set final CC number: resolves view value vs model value discrepancy
        let finalCreditCardNumber = this.finalCardFormat(this.cardNumber);

        let inSubmitOrderInfo : InSubmitOrderInformation = {
          PaymentMethods : [{
            PaymentMethod : 1,
            Amount : this.currentOrder.BalanceDueAmount,
            AccountNumber : finalCreditCardNumber,
            ExpirationDate : finalExpDate,
            SecurityCode : this.paymentForm.get('cvv').value,
            PaymentMethodType : this.cardType,
            ProcessingType : 0,
          }],
          SendEmail: true,
          Vehicle: this.vehicle
        }

        return inSubmitOrderInfo;
      }

      protected constructPayAtSitePayment(): InSubmitOrderInformation{
        let inSubmitOrderInfo : InSubmitOrderInformation = {
          PaymentMethods : [{
            PaymentMethod : 2
          }],
          SendEmail: true
        }

        return inSubmitOrderInfo;
      }

      protected constructSecurePayment(): InSubmitOrderInformation{
        let inSubmitOrderInfo : InSubmitOrderInformation = {
          PaymentMethods : [{
            PaymentMethod : 0,
            AccountId : this.savedPaymentMethods.AccountId,
            PaymentMethodType : this.savedPaymentMethods.MethodType,
            Amount: this.currentOrder.BalanceDueAmount
          }],
          Vehicle : this.vehicle,
          SendEmail: true
        }

        return inSubmitOrderInfo;
      }

      protected calculateTotal(fullOrder){
        let orderArray = Array();

        _.forEach(fullOrder.LineItems, function(value, key){
          let initialPrice = value.UnitPrice;
          let addOnPrice = 0;
          let modArray = Array();
          _.forEach(value.Modifiers, function(value, key){
            addOnPrice += (value.UnitPrice > 0 && value.FreeQuantity === 0) ? value.UnitPrice : 0;
            let modOject = {
              'name' : value.Name
            }
            modArray.push(modOject);
          });
          let finalPrice = (initialPrice + addOnPrice) * value.Quantity;
          let obj = {
            'name' : value.Name,
            'fullPrice' : finalPrice,
            'quantity' : value.Quantity,
            'modifiers' : modArray
          }
          orderArray.push(obj);
        });

        this.orderForDisplay = orderArray;
      }

      protected saveOrderAndRedirect(orderResults: any){
        this.localStorage.set('orderResult', orderResults).then(() => {
          // If Customer wishes to save payment method
          if(this.paymentForm.get('save-payment').value){
            let expirationDate = this.paymentForm.get('expiration-date').value;
            let finalExpDate = this.formatDate(expirationDate);
            // Ensure we have the correctly formatted credit card number
            let finalCreditCardNumber = this.finalCardFormat(this.cardNumber);

            let paymentInfoForSaving : RailsSavePayment = {
              payment : {
                AccountNumber: finalCreditCardNumber,
                ExpirationDate: finalExpDate,
                PaymentMethodType: this.cardType
              }
            }

            // Save payment method, then navigate to confirmation
            this.customerService.savePaymentMethod(paymentInfoForSaving, this.currentCustomer.CustomerId).subscribe(() => {

              this.navigateToConfirmation();
            });
          }
          else{

            this.navigateToConfirmation();
          }
        });
      }

      public detectCardType(val){
        let cardType = CreditCard.cardFromNumber(val);
        this.cardType = (val.length > 0 && cardType !== undefined) ? this.constants.paymentTypeMap[cardType.type] : undefined;
      }

      private patchContactForm(customer: Customer){
        this.contactInfoForm.patchValue({
          'first-name' : customer.FirstName,
          'last-name' : customer.LastName,
          'email' : customer.EMail,
          'phone': customer.VoicePhone
        })
      }

      protected finalCardFormat(cardNumber){
        return CreditCard.formatCardNumber(cardNumber).replace(/\D/g, '');
      }

      protected formatDate(date: string){
        return moment('01/' + date, 'DD/MM/YYYY').format('YYYY-MM-DD');
      }

      protected navigateToConfirmation(){

        this.navCtrl.setRoot('ThankYouPage');
      }

      // Currently not in use as API doesn't seem to allow for multiple saved payments
      public whichPayment(value){
        console.log(value);
      }

      set vehicle(vehicle: Vehicle){
        this._vehicle = vehicle;
      }

      get vehicle(): Vehicle{
        return this._vehicle;
      }


  }
