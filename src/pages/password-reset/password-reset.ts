import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

// @AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {


    constructor(

        public navCtrl: NavController,
        public navParams: NavParams

    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

}
