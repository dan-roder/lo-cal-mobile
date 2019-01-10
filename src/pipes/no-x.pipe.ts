import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noX'
})
export class NoXPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/[x\*]/g, '');
  }

}