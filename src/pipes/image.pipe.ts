import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'cardImage'
})
export class CardImagePipe implements PipeTransform {

  constructor() { }

  transform(alohaMenuId: any, menuItemMap?: any) {
    if(alohaMenuId) {
      let postObj = _.find(menuItemMap, {'menuid' : String(alohaMenuId)});

      if(postObj !== undefined){
        let returnObj = {};
        if(postObj['submenu_image'] !== undefined){
          returnObj['submenu_image'] = postObj['submenu_image'].url;
          returnObj['submenu_alt'] = postObj['submenu_image'].alt;
          return returnObj;
        }
        else{
          return '';
        }
      }
      else{
        return '';
      }
    }
  }

}