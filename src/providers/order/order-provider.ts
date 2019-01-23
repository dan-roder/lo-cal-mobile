import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Config } from '../../app/app.config';
import { LineItem } from '../../models/LineItem';
import { RailsSavePayment, InSubmitOrderInformation, RailsInSubmitOrder, SavedPayment } from '../../models/Payment';
import { RailsOrder, Order, OrderResults } from '../../models/Order';
import { CustomerProvider } from './../customer/customer';
import { Customer } from '../../models/Customer';
import * as _ from 'lodash';

@AutoUnsubscribe()

@Injectable()
export class OrderService {
 
    private userId : string;
    private _customerInfo : Customer;
    public _currentOrder : any;
    private _promiseDateTime : any;
    private _orderMode : number;
  
    constructor(
        private httpClient: Http,
        private localStorage: Storage,
        private config: Config,
        private customerService: CustomerProvider
      ) { }

      public putOrder(bagItems: Array<LineItem>): Observable<any>{
       
        let orderEndpoint = this.config.railsOrderEndpoint + '/' + this.config.siteId;
        let order = this.constructOrderObject(bagItems);

        return this.httpClient.put(orderEndpoint, order).map(apiResponse => {
          return apiResponse;
        });
      }

      public async saveOrderToLocalStorage(order){
        const response = await this.localStorage.set('order', order);
          return response;
      }

      protected constructOrderObject(bagItems: Array<LineItem>){

        let order : RailsOrder = {
          order : {
            SiteId : this.config.siteId,
            MenuId : this.config.menuId,
            PromiseDateTime : this._promiseDateTime,
            LineItems : bagItems,
            Customer : this._customerInfo,
            OrderMode : this._orderMode,
            PaymentMode : 'Unknown'
          }
        }
        return order;
      }

      public hasOrderBeenCreated(){
        return this.localStorage.get('order').then(orderDetails => {
          return orderDetails;
        });
      }

      public getPreSavedOrder(){
        return this.localStorage.get('order').then(orderDetails => {
          return orderDetails;
        })
      }


      public submitOrder(order: RailsInSubmitOrder, orderId: number): Observable<any>{
        return this.httpClient.post(this.config.railsOrderEndpoint + `/${this.config.siteId}/${orderId}`, order).map(orderResponse => {
          console.log(orderResponse);
          return orderResponse;
        })
      }

      public retrieveTimes(orderMode: string, orderSource: string = '0'): Observable<any>{
        // Order Sources
        //  0 - Website
        //  1 - Mobile (iPhone)
        //  2 - Mobile Web
        return this.httpClient.get(this.config.railsTimeEndpoint + `/${orderMode}/${orderSource}/${this.config.menuId}`).map(times => {
          return times;
        })
      }

      public calculateTotalWithModifiers(fullOrder: Order): Array<any>{
        let orderArray = Array();
    
        _.forEach(fullOrder.LineItems, (value) => {
          let initialPrice = value.UnitPrice;
          let addOnPrice = 0;
          let modArray = Array();
          let specialInstructions = value.SpecialInstructions;
    
          _.forEach(value.Modifiers, (value) => {
            addOnPrice += (value.UnitPrice > 0 && value.FreeQuantity === 0) ? value.UnitPrice : 0;
            let modOject = {
              'name' : value.Name
            }
            modArray.push(modOject);
          });
          let finalPrice = (initialPrice + addOnPrice) * value.Quantity;
          let obj = {
            'name' : value.Name,
            'fullPrice' : finalPrice,
            'quantity' : value.Quantity,
            'modifiers' : modArray,
            'specialInstructions' : specialInstructions
          }
          orderArray.push(obj);
        });
    
        return orderArray;
      }

      public getNextAvailableTime(){
        return this.httpClient.get(this.config.railsTimeEndpoint + '/1').map(time => {
          this._promiseDateTime = time.json();

          return time.json();
        })
      }

    

      get customerInfo(): Customer{
        return this._customerInfo;
      }

      set customerInfo(customer: Customer){
        this._customerInfo = customer;
      }

      get currentOrder(): any{
        return this._currentOrder;
      }

      set currentOrder(order: any){
        this._currentOrder = order;
      }

      get promiseDateTime(): any{
        return this._promiseDateTime;
      }

      set promiseDateTime(time: any){
        this._promiseDateTime = time;
      }

      get orderMode(): number{
        return this._orderMode;
      }
    
      set orderMode(mode: number){
        this._orderMode = mode;
      }

      public getFullOrderDetails(orderId: number): Observable<any>{
        let orderEndpoint = this.config.railsOrderEndpoint + `/${this.config.siteId}/${orderId}`;
        return this.httpClient.get(orderEndpoint).map(fullOrder => {
          this.currentOrder = fullOrder;
          
          return fullOrder;
        })
      }
}
