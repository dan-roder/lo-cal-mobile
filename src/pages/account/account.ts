import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import { Customer, RailsUpdate, InLoginUpdate } from '../../models/customer';
import { CustomerProvider } from '../../providers/customer/customer';
import { SavedPayment } from '../../models/Payment';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { PasswordMatch } from '../../utils/passwordmatch';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  public accountForm: FormGroup;
  public questionForm: FormGroup;
  public passwordForm: FormGroup;
  public errorOccurred: boolean = false;
  public accountError: string = '';
  public passwordError: string = '';
  public passwordSuccess: string = '';
  public customer : Customer;
  public customerId: string = '';
  public securityQuestion : string = '';
  public savedPayments : SavedPayment;
  public editing: boolean = false;
  public editingPassword: boolean = false;
  public accountProcessing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    private fb: FormBuilder,
    private localStorage: Storage,
    private customerService: CustomerProvider,
    private wpService: WordPressProvider,
    private loading: LoadingController
  ) {
    // Set up Account Form
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

    // Set up Password Reset Form
    this.passwordForm = fb.group({
      'old-password' : ['', Validators.required],
      'password' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
      'confirm-password' : ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    }, {
      validator : PasswordMatch.MatchPassword
    });
  }

  ionViewCanEnter(){
    console.log(this.authService.authenticated());
    // this.authService.authenticated().then(response => {
    //   if(response === null || response === undefined || response.CustomerId === undefined){
    //     this.navCtrl.push('LoginPage');
    //     return false;
    //   }
    //   else{
    //     return true;
    //   }
    // });
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
      let loading = this.loading.create({content: "Saving Account Details"});
      loading.present();

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
        if(data.status === 200){
          loading.dismiss();

          // Retrieve changed account details and update the form for the user
          this.customerService.getCustomerInfo(this.customerId).subscribe(returnObj => {
            let updatedCustomerInfo = returnObj.json();
            this.localStorage.set('user', updatedCustomerInfo).then(() => {
              this.patchAccountForm(updatedCustomerInfo);
              this.editing = false;
              this.accountError = '';
            });
          })
        }
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

  public editPassword(){
    this.editingPassword = !this.editingPassword;
    this.passwordError = '';
    this.passwordSuccess = '';

    if(!this.editingPassword){
      this.passwordForm.patchValue({
        'old-password' : '',
        'password' : '',
        'confirm-password' : ''
      });
    }
  }

  public updatePassword(formData){
    if(formData.valid){
      let loginInfo : InLoginUpdate = {
        Email : this.customer.EMail,
        OldPassword : formData.get('old-password').value,
        NewPassword : formData.get('password').value
      }

      this.customerService.updateLoginInfo(loginInfo).subscribe((result) => {
        this.passwordError = '';

        if(result.ok){
          this.editingPassword = false;
          this.passwordSuccess = 'Password successfully changed. You will now be logged out and need to log in again.';
          this.destroyAndLogout();
        }
      }, (error) => {
        const errorObj = error.json();
        this.passwordError = errorObj.message;
      });
    }
  }

  private destroyAndLogout(){
    setTimeout(() => {
      this.localStorage.remove('user').then(() => {
        console.log('user object removed');
        // TODO: SEND USER BACK TO INITIAL PAGE
        // this.router.navigateByUrl('/login');
      });
    }, 4000);
  }

}
