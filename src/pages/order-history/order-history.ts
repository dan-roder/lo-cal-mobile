import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { AuthProvider } from '../../providers/auth/auth';
import { Customer } from '../../models/customer';
import { CustomerProvider } from '../../providers/customer/customer';
import { Order } from '../../models/Order';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  private currentUser: Customer;
  public orderHistory: Array<Order>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider, private customerService: CustomerProvider) {
  }

  ionViewCanEnter(){
    return this.authService.authenticated().then(response => {
      if(!response){
        return false;
      }
      this.currentUser = response;
    });
  }

  ionViewDidLoad() {
    this.customerService.getOrderHistory(this.currentUser.CustomerId).subscribe(orderHistory => {
      const orderHistoryJson = orderHistory.json();
      this.orderHistory = orderHistoryJson;
    })
  }

}
