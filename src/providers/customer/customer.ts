import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Config } from '../../app/app.config';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CustomerProvider {
    // customer: InRegistration;
    customer: String;
    private    customerObserver = new Subject();
    customerId: Observable<any> = this.customerObserver.asObservable();

    constructor(

        private http    : Http,
        private storage : Storage,
        private config  : Config

    ) {

        this.storage.get('customerid').then( customerFromLocalStorage => {

            if ( customerFromLocalStorage ) {

                // this.customer = customerFromLocalStorage;
                this.customerObserver.next( customerFromLocalStorage );
            }

        })
        .catch(error => {

            console.log( error );

        });

    }

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
        console.log( request );
        return this.http.put( url, request, options )
            .map( res => {
                const response = res.json();
                console.log(response)
                if ( !response.Errors ) {
                    console.log( response );
                    let customer = response;
                    return this.save( customer );
                    // return this.customer;
                } else {
                    throw new Error( response.Errors[0].Message );
                }
            });
            // .catch( error => {
            //     console.log( error );
            //     return Observable.throw( error.json().error || "Server Error" );
            // });
    }

    save( customer ) {

        console.log(customer );
        let customerId = customer.CustomerId;
        this.storage.set( 'customerid', customerId ).then( () => {

            this.customerObserver.next( customerId );
            return customerId

        })
        .catch(error => {

            console.log(error);

        });

    }

    get currentCustomer() {

        return this.customer;

    }

    set currentCustomer( customerId ) {

        this.customer = customerId;
        this.customerObserver.next( customerId);

    }

}
