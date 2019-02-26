import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from "@ionic/storage";
import{ Customer } from "../../models/customer";
import { OrderService } from './../../providers/order/order-provider';

/**
 * Generated class for the GuestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-guest',
  templateUrl: 'guest.html',
})
export class GuestPage {

  public guestCheckoutForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private storage: Storage,
    private orderService: OrderService
  ) {

    this.guestCheckoutForm = this.fb.group({
      'guest-first-name': ['', [Validators.required, Validators.maxLength(28)]],
      'guest-last-name': ['', [Validators.required, Validators.maxLength(28)]],
      'guest-email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
  })

  }


  public checkoutAsGuest(){

    let loader = this.loadingController.create({ content: "Signing In As Guest" });
    loader.present()

    if(this.guestCheckoutForm.valid){
      // Save customer as normal
      let customer: Customer = {
        FirstName : this.guestCheckoutForm.controls['guest-first-name'].value,
        LastName : this.guestCheckoutForm.controls['guest-last-name'].value,
        EMail : this.guestCheckoutForm.controls['guest-email'].value,
        IsGuest : true
      }

      // Redirect to checkout review
      this.storage.set('user', customer).then(() => {
        this.orderService.customerInfo = customer;
        loader.dismiss();
        this.navCtrl.push('CheckoutReviewPage')
      });

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestPage');
  }

}
