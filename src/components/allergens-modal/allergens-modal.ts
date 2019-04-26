import { Component } from '@angular/core';
import { Config } from '../../app/app.config';
/**
 * Generated class for the AllergensModalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'allergens-modal',
  templateUrl: 'allergens-modal.html'
})
export class AllergensModalComponent {

  public show: boolean = false;
  public allergens: any[] = [];

  constructor(
    private config: Config
  ) {
    for(let key in this.config.allergenMap){
      this.allergens.push({
        key: key,
        value: this.config.allergenMap[key]
      });
    }
  }
  showModal() {
    this.show = !this.show
  }
}
