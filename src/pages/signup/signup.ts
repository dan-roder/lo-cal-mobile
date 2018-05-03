import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';


@IonicPage()
@Component({
    selector    : 'page-signup',
    templateUrl : 'signup.html'
})
export class SignupPage implements OnInit {

    custInfoComp : boolean = false;
    addressComp : boolean = false;
    passwordComp : boolean = false;
    signupForm : FormGroup;
    custInfo   : AbstractControl;
    firstName  : AbstractControl;
    lastName   : AbstractControl;
    email      : AbstractControl;
    phone      : AbstractControl;
    passwords  : AbstractControl;
    address    : AbstractControl;
    error      : any;

    constructor(
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private fb        : FormBuilder
    ) {}

    ngOnInit() {

        this.signupForm = this.fb.group({

                'custInfo' : this.fb.group({
                    'firstName' : [ '', [Validators.required] ],
                    'lastName'  : [ '', [Validators.required] ],
                    'email'     : [ '', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
                    'phone' : [ '', [Validators.required, Validators.pattern(/(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/)] ]
                }, { validator: this.checkCustInfo }),
                'address' : this.fb.group({
                    'line1' : [ '', [Validators.required] ],
                    'line2' :[ '' ],
                    'city' : [ '', [Validators.required] ],
                    'state' : [ '', [Validators.required] ],
                    'zip' : [ '', [Validators.required] ],
                    'description' : [ '', [Validators.required] ],
                }, { validator: this.checkAddress }),
                'passwords' : this.fb.group({

                    'password' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
                    'confirm'  : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
                    'question' : [ '', [Validators.required] ],
                    'answer' : [ '', [Validators.required] ]

                }, { validator: this.checkPasswords })


        });

        console.log( this.signupForm.controls );
        this.custInfo = this.signupForm.controls['custInfo'];
        this.firstName = this.signupForm.controls.custInfo['controls']['firstName'];
        this.lastName  = this.signupForm.controls.custInfo['controls']['lastName'];
        this.email     = this.signupForm.controls.custInfo['controls']['email'];
        this.phone     = this.signupForm.controls.custInfo['controls']['phone'];
        this.address = this.signupForm.controls['address'];
        this.passwords = this.signupForm.controls['passwords'];

    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad SignupPage');

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

    checkAddress( group: FormGroup ) {

        console.log( group.controls.line1.invalid, group.controls.line2.invalid, group.controls.city.invalid, group.controls.state.invalid, group.controls.zip.invalid);

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
        // if ( step === 'info' ) {



        // }

    }
    save( customer ) {

        console.log( customer );
    }

}
