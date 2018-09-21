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

                console.log( res );
                if ( res.ok ) {

                    console.log( res.json() );
                    let customer = res.json();

                    if(customer.Errors && customer.Errors[0].ErrorCode === 163) {

                        return 163

                    } else {

                        this.save( customer );

                        return 200
                    }
                    // return this.customer;

                }

            })
            .catch( error => {

                console.log( error );
                return Observable.throw( error.json().error || "Server Error" );

            });

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
