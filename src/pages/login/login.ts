import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoCalApiProvider } from '../../providers/lo-cal-api/lo-cal-api';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import {CustomerProvider} from '../../providers/customer/customer';
import { Storage } from "@ionic/storage";

@AutoUnsubscribe()

@IonicPage()

@Component({

    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [ LoCalApiProvider ]
})
export class LoginPage {
  public loading:   boolean;
  public loginForm: FormGroup;
  public email:     AbstractControl;
  private password:  AbstractControl;
  public error:     any;
  public page: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private localApi: LoCalApiProvider,
      private loadingController: LoadingController,
      private toastController: ToastController,
      private fb: FormBuilder,
      private customerService: CustomerProvider,
      private storage: Storage
  ) {

    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {

  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

  public login() {
    let loader = this.loadingController.create({
      content: "Please Wait"
    });

    if( this.loginForm.valid ) {

      let credentials = { "Email": this.email.value, "Password": this.password.value }
      loader.present();

      this.localApi.login( credentials ).subscribe( ( response ) => {
        loader.dismiss();

        let customerId = response.json();

        this.customerService.getCustomerInfo(customerId).subscribe(customerInfo => {
          let customerInfoJson = customerInfo.json();

          this.storage.set('user', customerInfoJson).then(() => {
            this.navCtrl.setRoot('TabsComponent');
          });
        });
      }, error => {
        loader.dismiss();
        let message = 'Sorry. We did not find a valid account for that username and password.';

        let toast = this.toastController.create({
          message: message,
          duration: 6000,
          position: 'bottom'
        });
        toast.present();
      });

    }
  }
}
