import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomerProvider } from '../../providers/customer/customer';
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
    selector    : 'page-signup',
    templateUrl : 'signup.html'
})
export class SignupPage implements OnInit {

    customerSubscription;
    custInfoComp : boolean = false;
    addressComp  : boolean = false;
    passwordComp : boolean = false;
    accountExists : boolean = false;
    accountCreated : boolean = false;
    processing   : boolean = false;
    signupForm   : FormGroup;
    custInfo     : AbstractControl;
    firstName     : AbstractControl;
    lastName     : AbstractControl;
    email        : AbstractControl;
    phone        : AbstractControl;
    passwords    : AbstractControl;
    question     : AbstractControl;
    answer       : AbstractControl;
    error        : any;
    line1        : AbstractControl;
    line2        : AbstractControl;
    state        : AbstractControl;
    city         : AbstractControl;
    zip          : AbstractControl;
    address      : AbstractControl;

    constructor(
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private fb        : FormBuilder,
        private customer  : CustomerProvider
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
                    // 'description' : [ '', [Validators.required] ],
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
        this.question = this.signupForm.controls.passwords['controls']['question'];
        this.answer = this.signupForm.controls.passwords['controls']['answer'];


    }
    ionViewDidLoad() {

        console.log('ionViewDidLoad SignupPage');

    }

    ionViewWillLeave() {

        if( this.customerSubscription ) this.customerSubscription.unsubscribe();
    }
    checkCustInfo( group: FormGroup ) {

        if ( group.controls.firstName.invalid || group.controls.lastName.invalid || group.controls.email.invalid || group.controls.phone.invalid ) {

            // display helper message if any of the required fields don't pass validation
            return { custInfoInvalid : true };

        } else {
            return null;
        }

    }
    checkAddress ( group: FormGroup ) {

    if(group.controls.line1.invalid || group.controls.city.invalid || group.controls.state.invalid || group.controls.zip.invalid) {

        // display helper message if any of the required fields don't pass validations
        return { notComplete : true }

    } else {
        return null
    }


    }
    checkPasswords( group: FormGroup ) {

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

    nextStep( step ) {

        // logic to switch between form steps
        if (step === 'info') {

            this.custInfoComp = !this.custInfoComp

        } else if(step === 'passwords') {

            this.addressComp = !this.addressComp

        }


    }
    clearValues() {
        this.processing = false
        this.navCtrl.push(LoginPage)
    }
    save( customer ) {

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

        this.customerSubscription = this.customer.create( customerObj ).subscribe( (res) => {

            console.log( res );
            // if (res === 163) {
            //     this.accountExists = true
            //     this.processing = true
            // }

           this.processing = true

            switch (res) {
                case 163 :

                  this.accountExists = true


                  break;

                case 200 :

                  this.accountCreated = true

                  break;
            }

        });

    }

}
