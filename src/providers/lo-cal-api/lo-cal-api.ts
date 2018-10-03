import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CustomerProvider } from '../../providers/customer/customer';
import { Config } from '../../app/app.config';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoCalApiProvider {

    apiUrl:string;

    constructor(

        private http     : Http,
        private storage  : Storage,
        private customer : CustomerProvider,
        private config   : Config

    ) {

        console.log( 'Hello LoCalApiProvider Provider' );
        this.apiUrl = this.config.localApi;

    }

    login( credentials ) {

        console.log( credentials, `${ this.apiUrl }/authenticate` );
        const url = `${ this.apiUrl }/authenticate`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {

            headers : headers

        };
        let request = JSON.stringify({

            credentials : credentials

        });
        console.log( request );
        return this.http.post( url, request, options )
            .map( res => {

                console.log( res.json() );
                if ( res.ok ) {

                    this.save( res.json() );
                    return res;

                }


            })
            .catch( error => {

                console.log( error );
                return Observable.throw( error.json().error || "Server Error" );

            });


    }

    logout() {

            this.save( null );

    }

    save( customer ) {
        console.log( customer );
        // let customerId = customer.CustomerId;
        this.storage.set( 'customerid', customer ).then( () => {

            console.log( customer );
            // Something we need to do?
            // this.customer.currentCustomer = customer;
            this.customer.currentCustomer = customer;

        })
        .catch(error => {

            console.log(error);

        });

    }

}
