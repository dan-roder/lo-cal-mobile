import { Component } from '@angular/core';

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

  show: boolean = false;

  constructor() {
    console.log('Hello AllergensModalComponent Component');
    console.log(this.show)
  }
  showModal() {
    console.log('click')
    this.show = !this.show
    console.log(this.show)
  }

}
