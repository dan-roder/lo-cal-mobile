import { AbstractControl } from "@angular/forms";


export class PasswordMatch {
  static MatchPassword(AC: AbstractControl){
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirm-password').value;

    if((password !== confirmPassword) && (password.length > 3) && (confirmPassword.length > 1)){
      AC.get('confirm-password').setErrors( { MatchPassword: true } );
    }
    else{
      return null;
    }
  }
}