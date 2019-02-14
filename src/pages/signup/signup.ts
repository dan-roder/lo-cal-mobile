import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomerProvider } from '../../providers/customer/customer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector    : 'page-signup',
    templateUrl : 'signup.html'
})
export class SignupPage implements OnInit {

  public customerSubscription;
  public custInfoComp : boolean = false;
  public addressComp  : boolean = false;
  public passwordComp : boolean = false;
  public accountExists : boolean = false;
  public accountCreated : boolean = false;
  public processing   : boolean = false;
  public signupForm   : FormGroup;
  public custInfo     : AbstractControl;
  public firstName     : AbstractControl;
  public lastName     : AbstractControl;
  public email        : AbstractControl;
  public phone        : AbstractControl;
  public passwords    : AbstractControl;
  public password     : AbstractControl;
  public confirm      : AbstractControl;
  public question     : AbstractControl;
  public answer       : AbstractControl;
  public error        : any;
  public line1        : AbstractControl;
  public line2        : AbstractControl;
  public state        : AbstractControl;
  public city         : AbstractControl;
  public zip          : AbstractControl;
  public address      : AbstractControl;


  constructor(
    public  navCtrl         : NavController,
    public  navParams       : NavParams,
    private fb              : FormBuilder,
    private customer        : CustomerProvider,
    private toastController : ToastController,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      'custInfo' : this.fb.group({
        'firstName' : [ '', [Validators.required] ],
        'lastName'  : [ '', [Validators.required] ],
        'email'     : [ '', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
        'phone' : [ '', Validators.compose([Validators.required, Validators.pattern(/(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/)])]
      }, { validator: this.checkCustInfo }),
      'address' : this.fb.group({
        'line1' : [ '', [Validators.required] ],
        'line2' :[ '' ],
        'city' : [ '', [Validators.required] ],
        'state' : [ '', [Validators.required] ],
        'zip' : [ '', [Validators.required, Validators.pattern('^[0-9]{5}$')] ]
      }, { validator: this.checkAddress }),
      'passwords' : this.fb.group({
        'password' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
        'confirm'  : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
        'question' : [ '', [Validators.required] ],
        'answer' : [ '', [Validators.required] ]
      }, { validator: this.checkPasswords })
    });

    this.custInfo  = this.signupForm.controls['custInfo'];
    this.firstName = this.signupForm.controls.custInfo['controls']['firstName'];
    this.lastName  = this.signupForm.controls.custInfo['controls']['lastName'];
    this.email     = this.signupForm.controls.custInfo['controls']['email'];
    this.phone     = this.signupForm.controls.custInfo['controls']['phone'];
    this.address   = this.signupForm.controls['address'];
    this.line1     = this.signupForm.controls.address['controls']['line1'];
    this.line2     = this.signupForm.controls.address['controls']['line2'];
    this.city      = this.signupForm.controls.address['controls']['city'];
    this.state     = this.signupForm.controls.address['controls']['state'];
    this.zip       = this.signupForm.controls.address['controls']['zip'];
    this.passwords = this.signupForm.controls['passwords'];
    this.password = this.signupForm.controls.passwords['controls']['password'];
    this.confirm = this.signupForm.controls.passwords['controls']['confirm'];
    this.question = this.signupForm.controls.passwords['controls']['question'];
    this.answer = this.signupForm.controls.passwords['controls']['answer'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

  ionViewWillLeave() {
    this.processing = false
  }

  public checkCustInfo( group: FormGroup ) {

    if ( group.controls.firstName.invalid || group.controls.lastName.invalid || group.controls.email.invalid || group.controls.phone.invalid ) {
      // display helper message if any of the required fields don't pass validation
      return { custInfoInvalid : true };
    } else {
      return null;
    }
  }

  public checkAddress ( group: FormGroup ) {
    if(group.controls.line1.invalid || group.controls.city.invalid || group.controls.state.invalid || group.controls.zip.invalid) {
      // display helper message if any of the required fields don't pass validations
      return { notComplete : true }
    } else {
      return null
    }
  }

  public checkPasswords( group: FormGroup ) {
    let pass = group.controls.password.value;
    let confirm = group.controls.confirm.value;

    if (group.controls.password.invalid) {
      // display helper message if password does not meet criteria
      return { notValid : true }
    } else if(pass !== confirm) {
      // compare password with confirmation, display message if no match
      return { notSame : true }
    }
  }

  public nextStep( step ) {
    // logic to switch between form steps
    if (step === 'info') {
      this.custInfoComp = !this.custInfoComp
    } else if(step === 'passwords') {
      this.addressComp = !this.addressComp
    }
  }

  public createNewAccount( customer ) {
    let loading = this.loading.create({content: "Creating New Account"});
    loading.present();
    console.log(customer);

    let customerObj = {
      "Customer": {
        "CustomerId": null,
        "EMail": this.email.value,
        "FirstName": this.firstName.value,
        "LastName": this.lastName.value,
        "VoicePhone": this.phone.value.replace(/[^A-Z0-9]/ig, ""),
        "FavoriteSiteIds": [1],
        "Addresses": [{
          AddressLine1: this.line1.value,
          AddressLine2: this.line2.value,
          City: this.city.value,
          State: this.state.value,
          Postal: this.zip.value
        }]
      },
      "Password": this.passwords['controls']['password'].value,
      "SecurityQuestion": this.question.value,
      "SecurityAnswer": this.answer.value
    };

    console.log(customerObj);
    return;

    this.customer.create( customerObj ).subscribe( (res) => {
      loading.dismiss();
      console.log(res);

      switch (res) {
        case 163 :
          this.accountExists = true
        break;
        case 200 :
          this.accountCreated = true
        break;
      }

    }, (error) => {
      console.log(error);
      loading.dismiss();
    });
  }
}
