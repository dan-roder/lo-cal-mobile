import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { Config } from '../../app/app.config';

/**
 * Generated class for the AllergenModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-allergen-modal',
  templateUrl: 'allergen-modal.html',
})
export class AllergenModalPage {

  public allergens: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private config: Config,
    private viewController: ViewController
  ) {
    for(let key in this.config.allergenMap){
      this.allergens.push({
        key: key,
        value: this.config.allergenMap[key]
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllergenModalPage');
  }
  closeModal() {
    this.viewController.dismiss()
  }

}
