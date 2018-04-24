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
        if (value.indexOf('[') !== -1) {
            let strArray = value.split('[');
            obj['description'] = strArray[0];
            // If the item has a ] in it slice it off so we're left with just allergen codes
            if (strArray[1] !== undefined) {
                strArray[1] = strArray[1].slice(0, -1);
                // Split allergens into subArray based on underscores
                strArray[1] = strArray[1].split('_');
                obj['allergens'] = strArray[1];
            }
        // If no allergen brackets are found, just build the obj from the value
        } else {
            obj['description'] = value;
            obj['allergens'] = "";
        }
        return obj;
    }

}
