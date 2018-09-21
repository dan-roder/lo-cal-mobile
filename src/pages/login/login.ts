import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { LoCalApiProvider } from '../../providers/lo-cal-api/lo-cal-api';
import { TabsComponent } from '../tabs/tabs'

@IonicPage()
@Component({

    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [ LoCalApiProvider ]
})
export class LoginPage {

    loading:   boolean;
    loginForm: FormGroup;
    email:     AbstractControl;
    password:  AbstractControl;
    error:     any;
    page: any;

    constructor(

        public navCtrl:            NavController,
        public navParams:          NavParams,
        private localApi:          LoCalApiProvider,
        private loadingController: LoadingController,
        private toastController:   ToastController,
        private fb:                FormBuilder

    ) {

        this.loginForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];

    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad LoginPage');

    }

    login() {

        let loader = this.loadingController.create({
            content: "Please Wait"
        });

        if( this.loginForm.valid ) {

            let credentials = { "Email": this.email.value, "Password": this.password.value }
            loader.present();

            this.localApi.login( credentials ).subscribe( ( response ) => {

                loader.dismiss();

                // this.navCtrl.push(TabsComponent)
                this.navCtrl.popToRoot();
                console.log( response );

            }, error => {

                loader.dismiss();
                console.log( error );
                let message = error;
                let toast = this.toastController.create({

                    message: message,
                    duration: 6000,
                    position: 'bottom'

                });
                toast.present();

            });

            // console.log( this.loginForm.valid, this.email.value, this.password.value );
            // let message = `Form Valid, email: ${this.email.value}, password: ${this.password.value}`;
            // let toast = this.toastController.create({
            //     message: message,
            //     duration: 6000,
            //     position: 'bottom'
            // });
            // toast.present();

        } else {
            console.log( this.loginForm.valid );

        }

    }

}
