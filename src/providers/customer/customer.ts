import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Config } from '../../app/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import { RailsSavePayment } from '../../models/Payment';
import { RailsUpdate, InLoginUpdate, InPasswordReset } from '../../models/customer';


@Injectable()
export class CustomerProvider {
  // customer: InRegistration;
  customer: any;
  private    customerObserver = new Subject();
  customerId: Observable<any> = this.customerObserver.asObservable();
  private _isLoggedIn: boolean = false;

  constructor( private http: Http, private storage: Storage, private config: Config) { }

  login( credentials ) {
    console.log( credentials );
  }

  create( customer ) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers : headers
    };

    const url = `${this.config.localApi}/customers`;

    let request = JSON.stringify({
      customer_info : customer
    });

    return this.http.put( url, request, options )
      .map( res => {
        if ( res.ok ) {
          let customer = res.json();

          if(customer.Errors && customer.Errors[0].ErrorCode === 163) {
            return 163;
          } else {
            this.save( customer );
            return 200;
          }
        } else {
          return Observable.throw( "Issue processing request, please try again." );
        }
      });
  }

  save( customer ) {
    let customerId = customer.CustomerId;

    this.storage.set( 'customerid', customerId ).then( () => {
      this.customerObserver.next( customerId );
      return customerId;
    })
    .catch(error => {
      console.log(error);
    });
  }

  get currentCustomer() {
    return this.customer;
  }

  set currentCustomer( customer ) {
    this.customer = customer;
    this.customerObserver.next( customer );
  }

  public getSecurityQuestion(email: string): Observable<any>{
    return this.http.get(this.config.railsCustomerEndpoint + `/securityquestions?Email=${email}`).map((question) => {
      return question;
    })
  }

  public forcePasswordReset(email: any): Observable<any>{
    return this.http.post(this.config.railsCustomerEndpoint + `/passwordreset/email`, email).map((result) => {
      return result;
    })
  }

  public passwordResetWithAnswer(data: InPasswordReset): Observable<any>{
    return this.http.post(this.config.railsCustomerEndpoint + `/passwordreset`, data).map(result => {
      return result;
    })
  }

  public getCustomerInfo(customerId: string): Observable<any>{
    return this.http.get(this.config.railsCustomerEndpoint + `/${customerId}`).map(userData => {
      return userData;
    })
  }

  public getUserData(){
    return this.storage.get('user').then(userInfo => {
      return userInfo;
    });
  }

  public getSavedPayments(customerId: string): Observable<any>{
    return this.http.get(this.config.railsCustomerEndpoint + `/${customerId}` + '/payments').map(data => {
      return data;
    })
  }

  public updateCustomerInfo(customer: RailsUpdate): Observable<any>{
    return this.http.post(this.config.railsCustomerEndpoint + `/${customer.customer_info.CustomerId}`, customer)
      .map(returnData => {
        return returnData;
      })
  }

  /**
   *
   * @param payment RailsSavePayment: payment data
   * @param customerId string: Aloha customer ID
   */
  public savePaymentMethod(payment: RailsSavePayment, customerId: string): Observable<any>{
    return this.http.post(this.config.railsCustomerEndpoint + `/${customerId}` + '/payments', payment).map(data => {
      return data;
    })
  }


  public logOut() {
    let itemsToRemove = ['user', 'customerid', 'order']

    itemsToRemove.forEach(element => {
      this.storage.remove(element);
    });
    this.isLoggedIn = false;
  }

  /**
   *
   * updateLoginInfo function
   *
   * @param updateLoginInfo InLoginUpdate
   *
   * @returns Observable of PasswordReset result from Aloha API
   */
  public updateLoginInfo(loginInfo: InLoginUpdate): Observable<any>{
    return this.http.post(this.config.railsCustomerEndpoint + `/loginupdate`, loginInfo).map((result) => {
      return result;
    });
  }

  get isLoggedIn(): boolean{
    return this._isLoggedIn;
  }

  set isLoggedIn(status: boolean){
    this._isLoggedIn = status;
  }

  /**
   *
   * deleteSavedPayment
   *
   * @param customerId
   * @param paymentId
   *
   * @returns Observable of result from Aloha API
   */
  public deleteSavedPayment(customerId: string, paymentId: string){
    return this.http.delete(this.config.railsCustomerEndpoint + `/${customerId}/payments/${paymentId}`).map(result => {
      return result;
    })
  }
}
