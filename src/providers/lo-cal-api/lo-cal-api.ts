import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../../app/app.config';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoCalApiProvider {

    apiUrl:string;

    constructor(

        public http: Http,
        private config: Config

    ) {

        console.log( 'Hello LoCalApiProvider Provider' );
        this.apiUrl = this.config.localApi;

    }

    login( credentials ) {

        // let url = this.apiUrl + '/auth/sign_in';

        // return this.http.post( url, credentials ).map( response => {
        //     console.log( response.headers.get( 'access-token' ) );
        //     return response.json();
        // });

        let url = this.apiUrl + "/settings";

        return this.http.get(url).map(response => {
            // console.log(response.headers.get("access-token"));
            return response.json();
        });


    }

}
