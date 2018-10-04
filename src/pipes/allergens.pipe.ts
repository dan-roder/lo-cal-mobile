import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'allergens'
})
export class AllergensPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // Create object to be returned and iterated
    let obj = {};

    // Find instance of Allergen brackets and split the string into array
    //  Item 1 is the full description
    //  Item 2 is the allergens
    if(value.indexOf('[') !== -1){
      let matches = value.match(/(.*)(\[.*\])(.*)/);
      obj['description'] = matches[1].trim();

      // If the item has a ] in it slice it off so we're left with just allergen codes
      if(matches[2] !== undefined){
        matches[2] = matches[2].slice(0, -1);
        matches[2] = matches[2].substr(1);
        // Split allergens into subArray based on underscores
        matches[2] = matches[2].split('_');

        obj['allergens'] = matches[2];
      }

      // If a 3rd matches group exists there was text beyond the allergens
      if(matches[3] !== undefined){
        obj['additionalInfo'] = matches[3].trim();
      }
    }
    else{
      obj['description'] = value.trim();
    }

    return obj;
  }

}
