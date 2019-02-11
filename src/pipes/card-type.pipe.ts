import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../app/app.config';
import * as _ from 'lodash';

@Pipe({
  name: 'cardType'
})
export class CardTypePipe implements PipeTransform {
  constructor(private config: Config){}

  transform(value: any, args?: any): any {
    for(let key in this.config.paymentTypeMap){
      if(this.config.paymentTypeMap[key] === value){
        return key;
      }
    }
  }

}
