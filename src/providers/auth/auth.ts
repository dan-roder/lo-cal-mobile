import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CustomerProvider } from '../customer/customer';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http, private customerProvider: CustomerProvider) {  }

  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated() : any {
    return this.customerProvider.isLoggedIn().then(user => {
      return user || false;
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
