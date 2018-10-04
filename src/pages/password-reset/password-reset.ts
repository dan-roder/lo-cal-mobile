import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { CustomerProvider } from '../../providers/customer/customer';
import { InPasswordReset } from '../../models/customer';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

    public passwordResetForm: FormGroup;
    public forcePasswordResetForm: FormGroup;
    public foundSecurityQuestion: boolean = false;
    public errorData: any = {};
    public securityQuestion: string = '';
    public switchForms: boolean = false;
    public submittedOnce: boolean = false;
    public passwordResetError: string = '';
    public passwordSuccess: boolean = false;
    public forcePasswordSuccess: boolean = false;
    public forceProcessing: boolean = false;
    public processing: boolean = false;
    public securityQuestionError: string = '';
    public forcePasswordError: string = '';

    constructor(

        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private customerService: CustomerProvider

    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');

  }

}
