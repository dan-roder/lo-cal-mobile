import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

@IonicPage()
@Component({
    selector    : 'page-signup',
    templateUrl : 'signup.html',
})
export class SignupPage implements OnInit {

    signupForm : FormGroup;
    firstName  : AbstractControl;
    lastName   : AbstractControl;
    email      : AbstractControl;
    passwords  : AbstractControl;
    error      : any;

    constructor(
        public  navCtrl   : NavController,
        public  navParams : NavParams,
        private fb        : FormBuilder
    ) {}

    ngOnInit() {

        this.signupForm = this.fb.group({

                'firstName' : [ '', [Validators.required] ],
                'lastName'  : [ '', [Validators.required] ],
                'email'     : [ '', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
                'passwords' : this.fb.group({

                    'password' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
                    'confirm'  : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])]

                }, { validator: this.checkPasswords })


        });

        this.firstName = this.signupForm.controls['firstName'];
        this.lastName  = this.signupForm.controls['lastName'];
        this.email     = this.signupForm.controls['email'];
        this.passwords       = this.signupForm.controls['passwords'];

    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad SignupPage');

    }

    checkPasswords ( group: FormGroup ) {

        let pass = group.controls.password.value;
        let confirm = group.controls.confirm.value;

        return pass === confirm ? null : { notSame: true };

    }

    save( customer ) {

        console.log( customer );
    }

}
