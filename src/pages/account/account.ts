import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewCanEnter(){
    this.authService.authenticated().then(response => {
      if(!response){
        this.navCtrl.push('LoginPage');
      }
    });
  }

}
