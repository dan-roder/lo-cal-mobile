import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomerProvider } from '../../providers/customer/customer';

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
    signupForm   : FormGroup;
    custInfo     : AbstractControl;
    firstName    : AbstractControl;
    lastName     : AbstractControl;
    email        : AbstractControl;
    phone        : AbstractControl;
    passwords    : AbstractControl;
    password     : AbstractControl;
    confirm      : AbstractControl;
    question     : AbstractControl;
    answer       : AbstractControl;
    error        : any;
    // line1        : AbstractControl;
    // line2        : AbstractControl;
    // state        : AbstractControl;
    // city         : AbstractControl;
    // zip          : AbstractControl;
    // address      : AbstractControl;

    constructor(
        public  navCtrl         : NavController,
        public  navParams       : NavParams,
        private fb              : FormBuilder,
        private customer        : CustomerProvider,
        private toastController : ToastController
    ) {}

    ngOnInit() {

        this.signupForm = this.fb.group({
            'custInfo' : this.fb.group({
                'firstName' : [ '', [Validators.required] ],
                'lastName'  : [ '', [Validators.required] ],
                'email'     : [ '', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
                'phone' : [ '', [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)] ]
            }, { validator: this.checkCustInfo }),
            // 'address' : this.fb.group({
            //     'line1' : [ '', [Validators.required] ],
            //     'line2' :[ '' ],
            //     'city' : [ '', [Validators.required] ],
            //     'state' : [ '', [Validators.required] ],
            //     'zip' : [ '', [Validators.required] ],
            //     'description' : [ '', [Validators.required] ],
            // }, { validator: this.checkAddress }),
            'passwords' : this.fb.group({

                'password' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
                'confirm'  : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
                'question' : [ '', [Validators.required] ],
                'answer' : [ '', [Validators.required] ]

            }, { validator: this.checkPasswords })
        });

        console.log( this.signupForm.controls );
        this.custInfo  = this.signupForm.controls['custInfo'];
        this.firstName = this.signupForm.controls.custInfo['controls']['firstName'];
        this.lastName  = this.signupForm.controls.custInfo['controls']['lastName'];
        this.email     = this.signupForm.controls.custInfo['controls']['email'];
        this.phone     = this.signupForm.controls.custInfo['controls']['phone'];
        // this.address   = this.signupForm.controls['address'];
        // this.line1     = this.signupForm.controls.address['controls']['line1'];
        // this.line2     = this.signupForm.controls.address['controls']['line2'];
        // this.city      = this.signupForm.controls.address['controls']['city'];
        // this.state     = this.signupForm.controls.address['controls']['state'];
        // this.zip       = this.signupForm.controls.address['controls']['zip'];
        this.passwords = this.signupForm.controls['passwords'];
        this.password = this.signupForm.controls.passwords['controls']['password'];
        this.confirm = this.signupForm.controls.passwords['controls']['confirm'];
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

        console.log( group.controls.phone.invalid );
        console.log( group.controls.firstName.invalid || group.controls.lastName.invalid || group.controls.email.invalid || group.controls.phone.invalid );

        if ( group.controls.firstName.invalid || group.controls.lastName.invalid || group.controls.email.invalid || group.controls.phone.invalid ) {
            return { custInfoInvalid : true };
        } else {
            return null;
        }

    }

    checkPasswords( group: FormGroup ) {

        let pass = group.controls.password.value;
        let confirm = group.controls.confirm.value;

        return pass === confirm ? null : { notSame: true };

    }

    nextStep( step ) {

        console.log( step );
        switch ( step ) {

            case 'info':
                this.custInfoComp = !this.custInfoComp;
            case 'passwords':
                this.passwordComp = !this.passwordComp;
            default:
                break;

        }

    }

    save( customer ) {
        console.log( customer );
        let customerObj = {

            "Customer": {

                "CustomerId": null,
                "EMail": this.email.value,
                "FirstName": this.firstName.value,
                "LastName": this.lastName.value,
                "VoicePhone": this.phone.value.replace(/[^A-Z0-9]/ig, ""),
                "FavoriteSiteIds": [1],
                "Addresses": []

            },
            "Password": this.passwords['controls']['password'].value,
            "SecurityQuestion": this.question.value,
            "SecurityAnswer": this.answer.value

        };
        console.log(customerObj);

        this.customerSubscription = this.customer.create( customerObj ).subscribe(
            response => {

                let toast = this.toastController.create({
                    message: "YOU ARE IN!",
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();
                console.log( response );
            },
            err => {
                console.log(err.message);
                let toast = this.toastController.create({
                    message: "Email already exists. Did you forget your password?",
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();

            }
        );

    }

}
