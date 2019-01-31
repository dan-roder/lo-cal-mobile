import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import { Customer, RailsUpdate } from '../../models/customer';
import { CustomerProvider } from '../../providers/customer/customer';
import { SavedPayment } from '../../models/Payment';
import { WordPressProvider } from '../../providers/word-press/word-press';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  public accountForm: FormGroup;
  public questionForm: FormGroup;
  public errorOccurred: boolean = false;
  public accountError: string = '';
  public customer : Customer;
  public customerId: string = '';
  public securityQuestion : string = '';
  public savedPayments : SavedPayment;
  public editing: boolean = false;
  public accountProcessing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    private fb: FormBuilder,
    private localStorage: Storage,
    private customerService: CustomerProvider,
    private wpService: WordPressProvider
  ) {
    this.accountForm = this.fb.group({
      'first-name' : [null, Validators.required],
      'last-name' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'phone' : ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      'full-address' : this.fb.group({
        'address' : [null, Validators.required],
        'address2' : null,
        'city' : [null, Validators.required],
        'state' : [{value:'', disabled: true}, Validators.required],
        'zip' : [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
      })
    });
  }

  ionViewCanEnter(){
    this.authService.authenticated().then(response => {
      if(response === null || response === undefined || response.CustomerId === undefined){
        this.navCtrl.push('LoginPage');
      }
    });
  }

  ionViewDidLoad() {
    // Get customer ID
    this.localStorage.get('user').then(customerData => {
      this.customer = customerData;
      this.customerId = customerData.CustomerId;

      this.patchAccountForm(customerData);
      // Retrieve security question
      // this.getSecurityQuestion();

      this.customerService.getSavedPayments(this.customerId).subscribe(paymentMethods => {
        this.savedPayments = paymentMethods;
      });
    });
  }

  private patchAccountForm(customerData){
    this.accountForm.patchValue({
      'first-name' : customerData.FirstName,
      'last-name' : customerData.LastName,
      'email' : customerData.EMail,
      'phone' : customerData.VoicePhone,
      'full-address' : {
        'address' : customerData.Addresses[0].AddressLine1,
        'address2' : customerData.Addresses[0].AddressLine2,
        'city' : customerData.Addresses[0].City,
        'state' : customerData.Addresses[0].State,
        'zip' : customerData.Addresses[0].Postal
      }
    });
    this.accountForm.controls['full-address']['controls']['state'].disable();
  }

  private getSecurityQuestion(){
    // Retrieve security question if it hasn't been fetched before
    if(this.securityQuestion === ''){
      this.customerService.getSecurityQuestion(this.customer.EMail).subscribe((question) => {
        this.securityQuestion = question;

        this.questionForm.patchValue({
          'security-question' : question
        });
      }, (error) => {
        console.log(error);
      })
    }
  }

  public editAccountDetails(){
    this.editing = !this.editing;
    // Enable the select group
    this.accountForm.controls['full-address']['controls']['state'].enable();
    // If returning to not editing, replace form with original data
    if(!this.editing) this.patchAccountForm(this.customer);
    // Return false to negate clicking an <a> tag
    return false;
  }

  public saveAccountDetails(formData){
    if(formData.valid){
      this.accountProcessing = true;
      let updateCustomer : RailsUpdate = {
        customer_info : {
          CustomerId : this.customerId,
          EMail : formData.get('email').value,
          FirstName : formData.get('first-name').value,
          LastName : formData.get('last-name').value,
          VoicePhone : formData.get('phone').value,
          Addresses : [{
            AddressType : 1,
            AddressId : 1,
            AddressLine1 : formData.controls['full-address'].get('address').value,
            AddressLine2 : formData.controls['full-address'].get('address2').value,
            City : formData.controls['full-address'].get('city').value,
            State : formData.controls['full-address'].get('state').value,
            Postal : formData.controls['full-address'].get('zip').value,
            IsDefault : true
          }]
        }
      };

      // Disable the select again
      this.accountForm.controls['full-address']['controls']['state'].disable();

      this.customerService.updateCustomerInfo(updateCustomer).subscribe(data => {
        console.log(data);
        this.customerService.getCustomerInfo(this.customerId).subscribe(updatedCustomerInfo => {
          this.patchAccountForm(updatedCustomerInfo);
          this.localStorage.set('user', updatedCustomerInfo).then(() => {});
          this.editing = false;
          this.accountProcessing = false;
          this.accountError = '';
        })
      }, error => {
        // Update failed for some reason. Show error, return form to initial state
        this.errorOccurred = true;
        this.accountProcessing = false;
        this.accountError = error.error.message;
        this.wpService.logError('Payment Order Error: ' + JSON.stringify(error)).subscribe((result) => {console.log('error:' + result)});
        this.patchAccountForm(this.customer);
      })
    }
  }

}
